# Generated by Django 3.1.2 on 2022-01-22 22:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_category'),
    ]

    operations = [
        migrations.AddField(
            model_name='portal',
            name='category_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='network.category'),
        ),
    ]