from rest_framework.permissions import BasePermission
from .models import WorkspaceMember

class IsWorkspaceAdmin(BasePermission):
    def has_object_permission(self, request, view, obj):
        membership = WorkspaceMember.objects.filter(workspace=obj.workspace, user=request.user, role='admin').first()
        return membership is not None
