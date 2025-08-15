from rest_framework import viewsets, permissions
from .models import Task, TaskComment, TaskActivity
from .serializers import TaskSerializer, TaskCommentSerializer, TaskActivitySerializer

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(project__workspace__memberships__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class TaskCommentViewSet(viewsets.ModelViewSet):
    serializer_class = TaskCommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskComment.objects.filter(task__project__workspace__memberships__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class TaskActivityViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TaskActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return TaskActivity.objects.filter(task__project__workspace__memberships__user=self.request.user)        
