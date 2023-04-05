from datetime import datetime

from django.conf import settings
from django.db import models

from apps.products.models import Product

User = settings.AUTH_USER_MODEL


class Review(models.Model):
    user = models.ForeignKey(User, related_name="reviews", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, related_name="product_review", on_delete=models.CASCADE
    )
    rating = models.DecimalField(max_digits=2, decimal_places=1)
    comment = models.TextField()
    date_created = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return self.comment
