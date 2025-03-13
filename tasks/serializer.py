from rest_framework import serializers
from .models import Task
#convertimos los datos a un json
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        #fields = ('id', 'title','description', 'done')
        fields = '__all__'