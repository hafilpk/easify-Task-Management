from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, permissions, status
from .models import Workspace, WorkspaceMember, Project, WorkspaceInvitation
from .serializers import WorkspaceSerializer, WorkspaceMemberSerializer, ProjectSerializer, WorkspaceInvitationSerializer

User = get_user_model()

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

class WorkspaceInvitationViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceInvitationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WorkspaceInvitation.objects.filter(invited_by=self.request.user)

    def perform_create(self, serializer):
        serializer.save(invited_by=self.request.user)

    @action(detail=True, methods=['post'], url_path='accept')
    def accept_invite(self, request, pk=None):
        try:
            invite = WorkspaceInvitation.objects.get(pk=pk, token=request.data.get('token'))
            if invite.accepted:
                return Response({'error': 'Invitation already accepted'}, status=status.HTTP_400_BAD_REQUEST)

            user, created = User.objects.get_or_create(email=invite.email, defaults={'username': invite.email})
            WorkspaceMember.objects.create(workspace=invite.workspace, user=user, role=invite.role)
            invite.accepted = True
            invite.save()

            return Response({'success': 'Invitation accepted'})
        except WorkspaceInvitation.DoesNotExist:
            return Response({'error': 'Invalid invitation'}, status=status.HTTP_404_NOT_FOUND)        

