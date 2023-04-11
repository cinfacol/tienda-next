from django.contrib import admin
from django.utils.html import format_html

from .models import ImgProduct, Product, ProductViews


class ImgProductAdmin(admin.TabularInline):
    model = ImgProduct


class ProductAdmin(admin.ModelAdmin):
    list_display = ["title", "advert_type", "product_type", "sold", "date_created"]
    list_filter = ["advert_type", "product_type", "sold", "date_created"]
    inlines = [ImgProductAdmin]

    def cover_photo(self, obj):
        return format_html(
            '<img src={} width="130" height="100" />', obj.cover_photo.url
        )


admin.site.register(Product, ProductAdmin)
admin.site.register(ProductViews)
