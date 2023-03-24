import logging

from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.wishlist.models import WishList
from config.settings import AUTH_USER_MODEL

logger = logging.getLogger(__name__)


@receiver(post_save, sender=AUTH_USER_MODEL)
def create_wishlist(sender, instance, created, **kwargs):
    if created:
        WishList.objects.create(user=instance)


@receiver(post_save, sender=AUTH_USER_MODEL)
def save_wishlist(sender, instance, **kwargs):
    instance.wishlist.save()
    logger.info(f"{instance}'s wishlist created")
