from rest_framework import viewsets, permissions
from .models import Workspace, WorkspaceMember, Project
from .serializers import WorkspaceSerializer, WorkspaceMemberSerializer, ProjectSerializer

class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Workspace.objects.filter(memberships__user=self.request.user)

    def perform_create(self, serializer):
        workspace = serializer.save(owner=self.request.user)
        WorkspaceMember.objects.create(
            workspace=workspace,
            user=self.request.user,
            role='admin'
        )


class WorkspaceMemberViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceMemberSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkspaceMember.objects.filter(workspace__memberships__user=self.request.user)


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(workspace__memberships__user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

