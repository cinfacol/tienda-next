import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.cart.models import Cart
from config.settings import AUTH_USER_MODEL

logger = logging.getLogger(__name__)


@receiver(post_save, sender=AUTH_USER_MODEL)
def create_shopping_cart(sender, instance, created, **kwargs):
    if created:
        Cart.objects.create(user=instance)


@receiver(post_save, sender=AUTH_USER_MODEL)
def save_shopping_cart(sender, instance, **kwargs):
    instance.cart.save()
    logger.info(f"{instance}'s cart created")
