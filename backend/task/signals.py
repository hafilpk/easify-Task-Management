from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .models import Task, TaskActivity

@receiver(pre_save, sender=Task)
def track_task_updates(sender, instance, **kwargs):
    if instance.pk:  # Task already exists
        old_task = Task.objects.get(pk=instance.pk)
        changes = []
        if old_task.status != instance.status:
            changes.append(f"Status changed from {old_task.status} to {instance.status}")
        if old_task.priority != instance.priority:
            changes.append(f"Priority changed from {old_task.priority} to {instance.priority}")
        if old_task.assigned_to != instance.assigned_to:
            changes.append(f"Assigned to changed from {old_task.assigned_to} to {instance.assigned_to}")

        for change in changes:
            TaskActivity.objects.create(
                task=instance,
                user=instance.updated_at and instance.created_by,
                action=change
            )
