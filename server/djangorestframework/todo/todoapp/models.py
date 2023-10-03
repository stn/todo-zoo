from django.db import models


class Todo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.TextField()
    completed = models.BooleanField(default=False)

    class Meta:
        ordering = ['created']
