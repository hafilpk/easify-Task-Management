from rest_framework.routers import DefaultRouter
from .views import WorkspaceViewSet, WorkspaceMemberViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r'workspaces', WorkspaceViewSet, basename='workspace')
router.register(r'workspace-members', WorkspaceMemberViewSet, basename='workspace-member')
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = router.urls