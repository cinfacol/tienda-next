import random
import string

from autoslug import AutoSlugField
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.categories.models import Category
from apps.common.models import TimeStampedUUIDModel

User = settings.AUTH_USER_MODEL


class ProductPublishedManager(models.Manager):
    def get_queryset(self):
        return (
            super(ProductPublishedManager, self)
            .get_queryset()
            .filter(published_status=True)
        )


class Product(TimeStampedUUIDModel):
    class AdvertType(models.TextChoices):
        FOR_SALE = "For Sale", _("For Sale")
        FOR_RENT = "For Rent", _("For Rent")
        AUCTION = "Auction", _("Auction")

    class ProductType(models.TextChoices):
        HOME = "Home", _("Home")
        OFFICE = "Office", _("Office")
        RECREATION = "Recreation", _("Recreation")
        COMMERCIAL = "Commercial", _("Commercial")
        OTHER = "Other", _("Other")

    user = models.ForeignKey(
        User,
        verbose_name=_("Agent,Seller or Buyer"),
        related_name="product_agent_buyer",
        on_delete=models.DO_NOTHING,
    )

    title = models.CharField(verbose_name=_("Product Title"), max_length=250)
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    ref_code = models.CharField(
        verbose_name=_("Product Reference Code"),
        max_length=255,
        unique=True,
        blank=True,
    )
    category = models.ForeignKey(
        Category,
        related_name="category",
        verbose_name=_("Category"),
        on_delete=models.CASCADE,
    )
    quantity = models.IntegerField(default=0)
    description = models.TextField(
        verbose_name=_("Description"),
        default="Default description...update me please....",
    )
    product_number = models.IntegerField(
        verbose_name=_("Product Number"),
        validators=[MinValueValidator(1)],
        default=112,
    )
    price = models.DecimalField(
        verbose_name=_("Price"), max_digits=8, decimal_places=2, default=0.0
    )
    tax = models.DecimalField(
        verbose_name=_("Product Tax"),
        max_digits=6,
        decimal_places=2,
        default=0.15,
        help_text="15% product tax charged",
    )
    advert_type = models.CharField(
        verbose_name=_("Advert Type"),
        max_length=50,
        choices=AdvertType.choices,
        default=AdvertType.FOR_SALE,
    )

    product_type = models.CharField(
        verbose_name=_("Product Type"),
        max_length=50,
        choices=ProductType.choices,
        default=ProductType.OTHER,
    )

    cover_photo = models.ImageField(
        verbose_name=_("Main Photo"),
        default="/product_sample.jpg",
        null=True,
        blank=True,
    )
    published_status = models.BooleanField(
        verbose_name=_("Published Status"), default=False
    )
    views = models.IntegerField(verbose_name=_("Total Views"), default=0)

    objects = models.Manager()
    published = ProductPublishedManager()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"

    def save(self, *args, **kwargs):
        self.title = str.title(self.title)
        self.description = str.capitalize(self.description)
        self.ref_code = "".join(
            random.choices(string.ascii_uppercase + string.digits, k=10)
        )
        super(Product, self).save(*args, **kwargs)

    @property
    def final_product_price(self):
        tax_percentage = self.tax
        product_price = self.price
        tax_amount = round(tax_percentage * product_price, 2)
        price_after_tax = float(round(product_price + tax_amount, 2))
        return price_after_tax


class ProductViews(TimeStampedUUIDModel):
    ip = models.CharField(verbose_name=_("IP Address"), max_length=250)
    product = models.ForeignKey(
        Product, related_name="product_views", on_delete=models.CASCADE
    )

    def __str__(self):
        return (
            f"Total views on - {self.product.title} is - {self.product.views} view(s)"
        )

    class Meta:
        verbose_name = "Total Views on Product"
        verbose_name_plural = "Total Product Views"
        """_summary_
        """


class ImgProduct(TimeStampedUUIDModel):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="img/%Y/%m")
    alt_text = models.CharField(max_length=255)
    Product = models.ForeignKey(
        Product,
        blank=True,
        null=True,
        related_name="prod_image",
        on_delete=models.CASCADE,
    )
    created_at = models.DateTimeField(auto_now_add=True, editable=False)

    def get_thumbnail(self):
        if self.image:
            return self.image.url
        return ""

    class Meta:
        verbose_name = "product image"
        verbose_name_plural = "product images"
        ordering = ("created_at",)

    def __str__(self):
        return self.alt_text
