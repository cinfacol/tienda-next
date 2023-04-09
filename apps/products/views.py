import logging

import django_filters
from django.db.models import query
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from apps.categories.models import Category

from .exceptions import ProductNotFound
from .models import Product, ProductViews
from .pagination import ProductPagination
from .serializers import (
    ProductCreateSerializer,
    ProductSerializer,
    ProductViewSerializer,
)

logger = logging.getLogger(__name__)


class ProductFilter(django_filters.FilterSet):

    advert_type = django_filters.CharFilter(
        field_name="advert_type", lookup_expr="iexact"
    )

    product_type = django_filters.CharFilter(
        field_name="product_type", lookup_expr="iexact"
    )

    price = django_filters.NumberFilter()
    price__gt = django_filters.NumberFilter(field_name="price", lookup_expr="gt")
    price__lt = django_filters.NumberFilter(field_name="price", lookup_expr="lt")

    class Meta:
        model = Product
        fields = ["advert_type", "product_type", "price"]


class ListAllProductsAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by("-created_at")
    pagination_class = ProductPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_class = ProductFilter
    search_fields = ["category", "product_type"]
    ordering_fields = ["created_at"]


class ListRelatedAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.all().order_by("-created_at")
    pagination_class = ProductPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    permission_classes = (permissions.AllowAny,)

    filterset_class = ProductFilter
    search_fields = ["category", "product_type"]
    ordering_fields = ["created_at"]

    def get(self, request, productId, format=None):
        """try:
            product_id = int(productId)
        except:
            return Response(
                {"error": "Product ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            )"""

        # Existe product id
        if not Product.objects.filter(id=productId).exists():
            return Response(
                {"error": "Product with this product ID does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )

        category = Product.objects.get(id=productId).category

        if Product.objects.filter(category=category).exists():
            # Si la categoria tiene padre filtrar solo por la categoria y no el padre tambien
            if category.parent:
                related_products = Product.objects.order_by("-sold").filter(
                    category=category
                )
            else:
                if not Category.objects.filter(parent=category).exists():
                    related_products = Product.objects.order_by("-sold").filter(
                        category=category
                    )

                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    related_products = Product.objects.order_by("-sold").filter(
                        category__in=filtered_categories
                    )

            # Excluir producto que estamos viendo
            related_products = related_products.exclude(id=productId)
            related_products = ProductSerializer(related_products, many=True)

            if len(related_products.data) > 3:
                return Response(
                    {"related_products": related_products.data[:3]},
                    status=status.HTTP_200_OK,
                )
            elif len(related_products.data) > 0:
                return Response(
                    {"related_products": related_products.data},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "No related products found"}, status=status.HTTP_200_OK
                )

        else:
            return Response(
                {"error": "No related products found"}, status=status.HTTP_200_OK
            )


class ListAgentsProductsAPIView(generics.ListAPIView):

    serializer_class = ProductSerializer
    pagination_class = ProductPagination
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_class = ProductFilter
    search_fields = ["category", "product_type"]
    ordering_fields = ["created_at"]

    def get_queryset(self):
        user = self.request.user
        queryset = Product.objects.filter(user=user).order_by("-created_at")
        return queryset


class ProductViewsAPIView(generics.ListAPIView):
    serializer_class = ProductViewSerializer
    queryset = ProductViews.objects.all()


""" class ProductDetailView(APIView):
    def get(self, request, slug):
        product = Product.objects.get(slug=slug)

        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")

        if not ProductViews.objects.filter(product=product, ip=ip).exists():
            ProductViews.objects.create(product=product, ip=ip)

            product.views += 1
            product.save()

        serializer = ProductSerializer(product, context={"request": request})

        return Response(serializer.data, status=status.HTTP_200_OK) """


class ProductDetailView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, productId, format=None):
        product_id = productId
        """ try:
            product_id = int(productId)
        except:
            return Response(
                {"error": "Product ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            ) """

        if Product.objects.filter(id=product_id).exists():
            product = Product.objects.get(id=product_id)

            product = ProductSerializer(product)

            return Response({"product": product.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Product with this ID does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )


@api_view(["PUT"])
@permission_classes([permissions.IsAuthenticated])
def UpdateProductAPIView(request, slug):
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        raise ProductNotFound

    user = request.user
    if product.user != user:
        return Response(
            {"error": "You can't update or edit a product that doesn't belong to you"},
            status=status.HTTP_403_FORBIDDEN,
        )
    if request.method == "PUT":
        data = request.data
        serializer = ProductSerializer(product, data, many=False)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


@api_view(["POST"])
@permission_classes([permissions.IsAuthenticated])
def CreateProductAPIView(request):
    user = request.user
    data = request.data
    data["user"] = request.user.pkid
    serializer = ProductCreateSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        logger.info(
            f"product {serializer.data.get('title')} created by {user.username}"
        )
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def DeleteProductAPIView(request, slug):
    try:
        product = Product.objects.get(slug=slug)
    except Product.DoesNotExist:
        raise ProductNotFound

    user = request.user
    if product.user != user:
        return Response(
            {"error": "You can't delete a product that doesn't belong to you"},
            status=status.HTTP_403_FORBIDDEN,
        )

    if request.method == "DELETE":
        delete_operation = product.delete()
        data = {}
        if delete_operation:
            data["success"] = "Deletion was successful"
        else:
            data["failure"] = "Deletion failed"
        return Response(data=data)


@api_view(["POST"])
def uploadProductImage(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(id=product_id)
    product.cover_photo = request.FILES.get("cover_photo")
    return Response("Image(s) uploaded")


class ProductSearchAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = ProductViewSerializer
    http_method_names = ["get", "post"]

    def post(self, request, format=None):
        product_results = Product.objects.filter(published_status=True)
        data = self.request.data

        # advert_type = data["advert_type"]
        # product_results = product_results.filter(advert_type__iexact=advert_type)

        # product_type = data["product_type"]
        # product_results = product_results.filter(product_type__iexact=product_type)

        """ try:
            category_id = int(data["category_id"])
        except:
            return Response(
                {"error": "Category ID must be an integer"},
                status=status.HTTP_404_NOT_FOUND,
            ) """

        category_id = data["category_id"]

        price_range = data["price_range"]
        sort_by = data["sort_by"]

        if not (
            sort_by == "date_created"
            or sort_by == "price"
            or sort_by == "sold"
            or sort_by == "name"
        ):
            sort_by = "date_created"

        order = data["order"]

        ## Si categoryID es = 0, filtrar todas las categorias
        if category_id == 0:
            product_results = Product.objects.all()
        elif not Category.objects.filter(id=category_id).exists():
            return Response(
                {"error": "This category does not exist"},
                status=status.HTTP_404_NOT_FOUND,
            )
        else:
            category = Category.objects.get(id=category_id)
            if category.parent:
                # Si la categoria tiene padre filtrar solo por la categoria y no el padre tambien
                product_results = Product.objects.filter(category=category)
            else:
                if not Category.objects.filter(parent=category).exists():
                    product_results = Product.objects.filter(category=category)
                else:
                    categories = Category.objects.filter(parent=category)
                    filtered_categories = [category]

                    for cat in categories:
                        filtered_categories.append(cat)

                    filtered_categories = tuple(filtered_categories)
                    product_results = Product.objects.filter(
                        category__in=filtered_categories
                    )

        # Filtrar por precio
        if price_range == "1 - 19":
            product_results = product_results.filter(price__gte=1)
            product_results = product_results.filter(price__lt=20)
        elif price_range == "20 - 39":
            product_results = product_results.filter(price__gte=20)
            product_results = product_results.filter(price__lt=40)
        elif price_range == "40 - 59":
            product_results = product_results.filter(price__gte=40)
            product_results = product_results.filter(price__lt=60)
        elif price_range == "60 - 79":
            product_results = product_results.filter(price__gte=60)
            product_results = product_results.filter(price__lt=80)
        elif price_range == "More than 80":
            product_results = product_results.filter(price__gte=80)

        """ if price_range != -1:
            queryset = queryset.filter(price__gte=price_range) """

        # Filtrar producto por sort_by
        if order == "desc":
            sort_by = "-" + sort_by
            product_results = product_results.order_by(sort_by)
        elif order == "asc":
            product_results = product_results.order_by(sort_by)
        else:
            product_results = product_results.order_by(sort_by)

        product_results = ProductSerializer(product_results, many=True)

        if len(product_results.data) > 0:
            return Response(
                {"filtered_products": product_results.data}, status=status.HTTP_200_OK
            )
        else:
            return Response({"error": "No products found"}, status=status.HTTP_200_OK)

        # catch_phrase = data["catch_phrase"]
        # queryset = queryset.filter(description__icontains=catch_phrase)

        # serializer = ProductSerializer(queryset, many=True)

        # return Response(serializer.data)
