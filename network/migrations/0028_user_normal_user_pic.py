# Generated by Django 4.0.4 on 2022-04-22 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0027_viewing_delete_category_remove_userinfo_views_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='normal_user_pic',
            field=models.CharField(max_length=256, null=True),
        ),
    ]
