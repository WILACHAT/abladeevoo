# Generated by Django 4.0.6 on 2022-07-18 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0051_reservation_paymentmethod'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='chargedprice',
            field=models.IntegerField(null=True),
        ),
    ]
