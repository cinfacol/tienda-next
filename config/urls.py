from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("supersecret/", admin.site.urls),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.jwt")),
    # path('auth/', include('djoser.social.urls')),
    path("api/categories/", include("apps.categories.urls")),
    path("api/products/", include("apps.products.urls")),
    path("api/cart/", include("apps.cart.urls")),
    path("api/shipping/", include("apps.shipping.urls")),
    path("api/orders/", include("apps.orders.urls")),
    path("api/payments/", include("apps.payments.urls")),
    path("api/coupons/", include("apps.coupons.urls")),
    path("api/profile/", include("apps.profiles.urls")),
    path("api/wishlist/", include("apps.wishlist.urls")),
    path("api/reviews/", include("apps.reviews.urls")),
]

admin.site.site_header = "Shop Eline Admin"
admin.site.site_title = "Shop Eline Admin Portal"
admin.site.index_title = "Welcome to the Shop Eline Portal"
