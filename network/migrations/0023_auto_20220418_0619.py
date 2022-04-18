# Generated by Django 3.1.2 on 2022-04-18 06:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0022_auto_20220418_0618'),
    ]

    operations = [
        migrations.AlterField(
            model_name='requesteddara',
            name='requested_user',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requested_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
