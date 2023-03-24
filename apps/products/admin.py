from django.contrib import admin

from .models import Product, ProductViews


class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "advert_type", "product_type"]
    list_filter = ["advert_type", "product_type"]


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductViews)
