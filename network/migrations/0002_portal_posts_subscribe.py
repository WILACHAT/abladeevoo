# Generated by Django 3.1.2 on 2022-01-20 20:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Portal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('portal_name', models.CharField(max_length=256, null=True)),
                ('portal_des', models.CharField(max_length=256, null=True)),
                ('portal_price', models.CharField(max_length=256, null=True)),
                ('creationtime', models.DateTimeField(auto_now_add=True)),
                ('websiteurl', models.URLField(max_length=256, null=True)),
                ('portal_pic', models.URLField(max_length=256, null=True)),
                ('portalbgcolor', models.CharField(max_length=256, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subscribe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subsribe_ornot', models.BooleanField(default=True)),
                ('portal_id_subscribing', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subscribing', to='network.portal')),
                ('user_id_subsriber', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subsriber', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Posts',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('post_info', models.CharField(max_length=256)),
                ('type_posts', models.CharField(max_length=256)),
                ('creationtime', models.DateTimeField(auto_now_add=True)),
                ('modify_date', models.DateTimeField(auto_now=True)),
                ('portal_id_posts', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='portalidposts', to='network.portal')),
                ('user_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='postposts', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
