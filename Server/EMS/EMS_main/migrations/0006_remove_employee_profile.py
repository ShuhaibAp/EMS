# Generated by Django 5.1.3 on 2024-12-07 07:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('EMS_main', '0005_alter_employee_profile_alter_userprofile_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='profile',
        ),
    ]