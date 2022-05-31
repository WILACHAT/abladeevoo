# Generated by Django 3.2.13 on 2022-05-30 11:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0047_alter_user_accountstatus'),
    ]

    operations = [
        migrations.CreateModel(
            name='PasswordReset',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=256, null=True)),
                ('expiration', models.CharField(max_length=256, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='resetuser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]