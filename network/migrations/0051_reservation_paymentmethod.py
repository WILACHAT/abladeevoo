# Generated by Django 4.0.6 on 2022-07-18 10:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0050_reservation_orderid'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='paymentmethod',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
