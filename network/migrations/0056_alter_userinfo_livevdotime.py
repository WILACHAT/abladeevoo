# Generated by Django 3.2.13 on 2022-07-02 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0055_alter_userinfo_livevdotime'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userinfo',
            name='livevdotime',
            field=models.TextField(null=True),
        ),
    ]
