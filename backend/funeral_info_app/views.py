from .serializers import CreateFuneralSerializer
from .models import CreateFuneral

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class CreateFuneralViewSet(viewsets.ModelViewSet):
    serializer_class = CreateFuneralSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = CreateFuneral.objects.all()
    
    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def get_funeral_info(self, request):
        number_of_funerals = CreateFuneral.objects.all()
        number_of_completed_funerals = CreateFuneral.objects.filter(funeral_closed=True)
        number_of_upcoming_funerals = CreateFuneral.objects.filter(funeral_closed=False)

        data = {
            'number_of_funerals': number_of_funerals.count(),
            'number_of_completed_funerals': number_of_completed_funerals.count(),
            'number_of_upcoming_funerals': number_of_upcoming_funerals.count()
        }
        return Response(data)




