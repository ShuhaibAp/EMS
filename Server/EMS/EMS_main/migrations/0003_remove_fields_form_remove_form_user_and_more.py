# Generated by Django 5.1.3 on 2024-12-06 14:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EMS_main', '0002_remove_form_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='fields',
            name='form',
        ),
        migrations.RemoveField(
            model_name='form',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='user',
        ),
        migrations.DeleteModel(
            name='Employee',
        ),
        migrations.DeleteModel(
            name='Fields',
        ),
        migrations.DeleteModel(
            name='Form',
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
