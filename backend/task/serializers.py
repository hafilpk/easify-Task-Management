from rest_framework import serializers
from .models import Task, TaskComment, TaskActivity, TaskAttachment

class TaskCommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = TaskComment
        fields = ['id', 'task', 'author', 'author_name', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']

class TaskActivitySerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = TaskActivity
        fields = ['id', 'task', 'user', 'user_name', 'action', 'timestamp']
        read_only_fields = ['user', 'timestamp']


class TaskSerializer(serializers.ModelSerializer):
    comments = TaskCommentSerializer(many=True, read_only=True)
    activities = TaskActivitySerializer(many=True, read_only=True)
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['created_by', 'created_at', 'updated_at']

class TaskAttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskAttachment
        fields = ['id', 'task', 'uploaded_by', 'file', 'uploaded_at']
        read_only_fields = ['uploaded_by', 'uploaded_at']