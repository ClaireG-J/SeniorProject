# Generated by Django 5.1.6 on 2025-02-25 02:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('be_app', '0003_alter_student_id_alter_teacher_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='teacher',
            name='name',
            field=models.CharField(default='Unkown', max_length=100),
        ),
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='teacher',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]
