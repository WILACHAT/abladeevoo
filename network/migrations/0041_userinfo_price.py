# Generated by Django 4.0.4 on 2022-05-15 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0040_userinfo_omiserecipent'),
    ]

    operations = [
        migrations.AddField(
            model_name='userinfo',
            name='price',
            field=models.IntegerField(null=True),
        ),
    ]