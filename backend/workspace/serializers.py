from rest_framework import serializers
from .models import Workspace, WorkspaceMember, Project

class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = '__all__'
        read_only_fields = ['owner', 'created_at']


class WorkspaceMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceMember
        fields = '__all__'
        read_only_fields = ['joined_at']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['created_at', 'created_by']
