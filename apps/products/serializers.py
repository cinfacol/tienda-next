from rest_framework import serializers

from apps.reviews.models import Review

from .models import ImgProduct, Product, ProductViews


class ReviewsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "comment",
            "date_created",
        ]


class ImgProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImgProduct
        fields = [
            "id",
            "name",
            "image",
            "alt_text",
            "created_at",
        ]


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    profile_photo = serializers.SerializerMethodField()
    reviews = ReviewsProductSerializer(
        many=True,
        read_only=True,
        source="product_review",
    )
    images = ImgProductSerializer(many=True, read_only=True, source="prod_image")

    class Meta:
        model = Product
        fields = [
            "id",
            "user",
            "profile_photo",
            "title",
            "slug",
            "ref_code",
            "description",
            "category",
            "quantity",
            "product_number",
            "price",
            "tax",
            "sold",
            "final_product_price",
            "advert_type",
            "product_type",
            "cover_photo",
            "images",
            "published_status",
            "views",
            "reviews",
        ]

    def get_user(self, obj):
        return obj.user.username

    def get_cover_photo(self, obj):
        return obj.cover_photo.url

    def get_profile_photo(self, obj):
        return obj.user.profile.profile_photo.url


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        exclude = ["updated_at", "pkid"]


class ProductViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductViews
        exclude = ["updated_at", "pkid"]
