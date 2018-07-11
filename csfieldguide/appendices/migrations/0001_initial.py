# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-04-23 04:25
from __future__ import unicode_literals

import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Appendix',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('languages', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), default=[], size=None)),
                ('slug', models.SlugField(unique=True)),
                ('name', models.CharField(default='', max_length=100)),
                ('template', models.CharField(max_length=100)),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='Subappendix',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('languages', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=10), default=[], size=None)),
                ('slug', models.SlugField(unique=True)),
                ('name', models.CharField(default='', max_length=100)),
                ('template', models.CharField(max_length=100)),
                ('appendix', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subappendices', to='appendices.Appendix')),
            ],
            options={
                'ordering': ['name'],
            },
        ),
    ]