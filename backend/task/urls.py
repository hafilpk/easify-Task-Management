from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, TaskCommentViewSet, TaskActivityViewSet

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'task-comments', TaskCommentViewSet, basename='task-comment')
router.register(r'task-activities', TaskActivityViewSet, basename='task-activity')

urlpatterns = router.urls
