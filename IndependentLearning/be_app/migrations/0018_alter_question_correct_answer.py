# Generated by Django 5.1.6 on 2025-04-01 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("be_app", "0017_alter_question_correct_answer_alter_question_id_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="question",
            name="correct_answer",
            field=models.IntegerField(default=1),
        ),
    ]
