from django.urls import path

from .views import (
    CreateProductAPIView,
    DeleteProductAPIView,
    ListAgentsProductsAPIView,
    ListAllProductsAPIView,
    ListRelatedAPIView,
    ProductDetailView,
    ProductSearchAPIView,
    UpdateProductAPIView,
)

urlpatterns = [
    path("all/", ListAllProductsAPIView.as_view(), name="all-products"),
    path("agents/", ListAgentsProductsAPIView.as_view(), name="agent-products"),
    path("create/", CreateProductAPIView, name="product-create"),
    path(
        "<productId>/",
        ProductDetailView.as_view(),
        name="product-id",
    ),
    path(
        "related/<productId>/",
        ListRelatedAPIView.as_view(),
        name="related-products",
    ),
    path("update/<productId>/", UpdateProductAPIView, name="update-product"),
    path("delete/<productId>/", DeleteProductAPIView, name="delete-product"),
    path("by/search/", ProductSearchAPIView.as_view(), name="product-search"),
]
