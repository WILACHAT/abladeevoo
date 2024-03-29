# Generated by Django 4.0.4 on 2022-05-10 17:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0036_feedback_maillistlist'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReportTable',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('report_value', models.CharField(max_length=256, null=True)),
                ('influencer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='influencer_view_report', to=settings.AUTH_USER_MODEL)),
                ('requester', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='requester_view_report', to=settings.AUTH_USER_MODEL)),
                ('reservation_foreign', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='reservation_foreign_report', to='network.reservation')),
            ],
        ),
    ]
