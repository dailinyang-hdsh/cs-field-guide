# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-06-26 02:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chapters', '0030_chaptersectionheading'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chaptersectionheading',
            name='name',
            field=models.CharField(default='', max_length=300),
        ),
        migrations.AlterField(
            model_name='chaptersectionheading',
            name='slug',
            field=models.SlugField(max_length=300),
        ),
    ]
