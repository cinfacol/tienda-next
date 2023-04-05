from rest_framework import serializers

from apps.reviews.models import Review

from .models import Product, ProductViews


class ReviewsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "comment",
            "date_created",
        ]


class ProductSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    cover_photo = serializers.SerializerMethodField()
    profile_photo = serializers.SerializerMethodField()
    photo1 = serializers.SerializerMethodField()
    photo2 = serializers.SerializerMethodField()
    photo3 = serializers.SerializerMethodField()
    photo4 = serializers.SerializerMethodField()
    reviews = ReviewsProductSerializer(
        many=True,
        read_only=True,
        source="product_review",
    )

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
            "final_product_price",
            "advert_type",
            "product_type",
            "cover_photo",
            "photo1",
            "photo2",
            "photo3",
            "photo4",
            "published_status",
            "views",
            "reviews",
        ]

    def get_user(self, obj):
        return obj.user.username

    def get_cover_photo(self, obj):
        return obj.cover_photo.url

    def get_photo1(self, obj):
        return obj.photo1.url

    def get_photo2(self, obj):
        return obj.photo2.url

    def get_photo3(self, obj):
        return obj.photo3.url

    def get_photo4(self, obj):
        return obj.photo4.url

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
