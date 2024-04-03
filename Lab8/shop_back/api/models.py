from django.db import models


# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField(default=100)
    description = models.TextField(default="")
    category = models.CharField(max_length=255, default="")
    count = models.IntegerField(default=0)
    is_active = models.BooleanField(default=False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'category': self.category,
            'count': self.count,
            'is_active': self.is_active,
            'price_and_description': str(self.price) + self.description
        }


class Category(models.Model):
    name = models.CharField(max_length=255)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }
