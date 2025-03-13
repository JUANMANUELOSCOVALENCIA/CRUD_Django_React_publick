# Importación de los módulos necesarios
from django.urls import path, include  # Para definir rutas y agrupar las URLs en Django
from drf_spectacular.views import SpectacularAPIView, \
    SpectacularSwaggerView  # Para generar la documentación de la API con DRF Spectacular
from rest_framework import routers  # Para crear el enrutador de la API REST
from tasks import views  # Para importar las vistas (views) que controlan la lógica de las tareas

# Creación del enrutador de la API usando DefaultRouter de Django REST framework
router = routers.DefaultRouter()

# Registro de la vista TaskView para la URL 'tasks', el nombre del recurso será 'tasks'
# Esto permitirá acceder a los endpoints relacionados con 'tasks' de forma automática
router.register(r'tasks', views.TaskView, 'tasks')

# Definición de las URLs de la aplicación, incluyendo el enrutador configurado
# Al hacer esto, se agregan todas las rutas del enrutador a la ruta base 'api/v1/'
urlpatterns = [
    path("api/v1/", include(router.urls)),  # Rutas de la API estarán bajo /api/v1/

    # Endpoint para generar el esquema de la API en formato OpenAPI
    path('schema/', SpectacularAPIView.as_view(), name='schema'),

    # Endpoint para visualizar la documentación de la API en Swagger UI, usando el esquema generado
    path('docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'),
]
