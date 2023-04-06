from django.urls import path

from . import views

urlpatterns = [
    path("all/", views.ListAllProductsAPIView.as_view(), name="all-products"),
    path("agents/", views.ListAgentsProductsAPIView.as_view(), name="agent-products"),
    path("create/", views.create_product_api_view, name="product-create"),
    path(
        "<productId>/",
        views.ProductDetailView.as_view(),
        name="product-id",
    ),
    path("update/<productId>/", views.update_product_api_view, name="update-product"),
    path("delete/<productId>/", views.delete_product_api_view, name="delete-product"),
    path("search/", views.ProductSearchAPIView.as_view(), name="product-search"),
]
