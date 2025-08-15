import uuid
from rest_framework import serializers
from .models import Workspace, WorkspaceMember, Project, WorkspaceInvitation

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = '__all__'
        read_only_fields = ['owner', 'created_at']


class WorkspaceMemberSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        model = WorkspaceMember
        fields = '__all__'
        read_only_fields = ['joined_at']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by']

class WorkspaceInvitationSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceInvitation
        fields = ['id', 'workspace', 'email', 'invited_by', 'role', 'token', 'accepted', 'created_at']
        read_only_fields = ['invited_by', 'token', 'accepted', 'created_at']

    def create(self, validated_data):
        validated_data['token'] = str(uuid.uuid4())
        return super().create(validated_data)        
