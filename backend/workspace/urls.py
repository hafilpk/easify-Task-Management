from rest_framework.routers import DefaultRouter
from .views import WorkspaceViewSet, WorkspaceMemberViewSet, ProjectViewSet, WorkspaceInvitationViewSet

router = DefaultRouter()
router.register(r'workspaces', WorkspaceViewSet, basename='workspace')
router.register(r'workspace-members', WorkspaceMemberViewSet, basename='workspace-member')
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'invitations', WorkspaceInvitationViewSet, basename='workspace-invitation')
urlpatterns = router.urls