# Generated by Django 4.0.4 on 2022-05-15 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0041_userinfo_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='omisecharge',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
