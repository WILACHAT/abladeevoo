# Generated by Django 3.2.13 on 2022-07-01 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0052_auto_20220629_2207'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservationlive',
            name='liveminutes',
            field=models.CharField(max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='customvdo',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='livevdo',
            field=models.BooleanField(default=True),
        ),
    ]
