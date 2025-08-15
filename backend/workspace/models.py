from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Workspace(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owned_workspaces")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class WorkspaceMember(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('member', 'Member'),
    ]

    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="memberships")
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workspace_memberships")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='member')
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('workspace', 'user')

    def __str__(self):
        return f"{self.user.username} in {self.workspace.name} ({self.role})"


class Project(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="projects")
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name="created_projects")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class WorkspaceInvitation(models.Model):
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="invitations")
    email = models.EmailField()
    invited_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_invitations")
    role = models.CharField(max_length=20, choices=WorkspaceMember.ROLE_CHOICES, default='member')
    token = models.CharField(max_length=100, unique=True)
    accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Invite to {self.email} for {self.workspace}"