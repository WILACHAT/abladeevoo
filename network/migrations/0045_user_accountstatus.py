# Generated by Django 3.2.13 on 2022-05-19 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0044_auto_20220518_1021'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='accountstatus',
            field=models.CharField(max_length=256, null=True),
        ),
    ]