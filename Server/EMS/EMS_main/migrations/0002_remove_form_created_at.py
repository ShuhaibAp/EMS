# Generated by Django 5.1.3 on 2024-12-05 08:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EMS_main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='form',
            name='created_at',
        ),
    ]
