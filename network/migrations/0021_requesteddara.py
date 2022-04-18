# Generated by Django 3.1.2 on 2022-04-18 01:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0020_postandmessage_hide'),
    ]

    operations = [
        migrations.CreateModel(
            name='Requesteddara',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256, null=True)),
                ('email', models.CharField(max_length=256, null=True)),
                ('phone', models.CharField(max_length=256, null=True)),
                ('find', models.CharField(max_length=256, null=True)),
                ('findusername', models.CharField(max_length=256, null=True)),
                ('followernum', models.CharField(max_length=256, null=True)),
                ('requested_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requested_user', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]