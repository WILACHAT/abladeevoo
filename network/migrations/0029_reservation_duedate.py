# Generated by Django 4.0.4 on 2022-04-23 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0028_user_normal_user_pic'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='duedate',
            field=models.DateTimeField(null=True),
        ),
    ]
