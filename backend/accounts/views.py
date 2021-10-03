from .serializers import *
from rest_framework import mixins, generics, status
# from rest_framework.authtoken.views import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.

class Users(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = User.objects.all()
    serializer_class = UsersSerializer
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        # token, created = Token.objects.get_or_create(user=serializer.instance)
        refresh = RefreshToken.for_user(serializer.instance)
        return Response({"user":serializer.data, "refresh":str(refresh), "access":str(refresh.access_token)}, status=status.HTTP_201_CREATED)
