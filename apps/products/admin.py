from django.contrib import admin

from .models import Product, ProductViews, ImgProduct


class ImgProductAdmin(admin.TabularInline):
    model = ImgProduct


class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "advert_type", "product_type"]
    list_filter = ["advert_type", "product_type"]
    inlines = [ImgProductAdmin]


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductViews)
