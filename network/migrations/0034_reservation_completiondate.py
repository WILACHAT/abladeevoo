# Generated by Django 4.0.4 on 2022-05-04 06:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0033_reservation_realduedate'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='completiondate',
            field=models.DateTimeField(auto_now=True),
        ),
    ]