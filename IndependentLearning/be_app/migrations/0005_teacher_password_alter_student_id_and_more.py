# Generated by Django 5.1.6 on 2025-03-14 19:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('be_app', '0004_teacher_name_alter_student_id_alter_teacher_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='password',
            field=models.CharField(default='Unkown', max_length=255),
        ),
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='id',
            field=models.BigAutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='name',
            field=models.CharField(default='Unknown', max_length=100),
        ),
    ]
