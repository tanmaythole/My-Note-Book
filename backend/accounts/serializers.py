from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'email', 'password']

        extra_kwargs = {
            "password":{
                "write_only":True,
                "required":True
            }
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     token, created = Token.objects.create(user=user)
    #     return Response(serializer.data, token=str(token), status=status.HTTP_201_CREATED, headers=headers)