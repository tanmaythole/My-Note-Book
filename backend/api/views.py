# from rest_framework.decorators import api_view
# from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *
from datetime import datetime
from rest_framework import mixins, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

# Create your views here.
class NotesList(generics.GenericAPIView, mixins.ListModelMixin, mixins.CreateModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    # queryset = Notes.objects.all()
    serializer_class = NotesSerializer
    # authentication_classes = (TokenAuthentication, )
    authentication_classes = (JWTAuthentication, )
    permission_classes = [IsAuthenticated]

    lookup_field = 'id'

    def get_queryset(self):
        queryset = Notes.objects.filter(user_id=self.request.user.id)
        return queryset
    

    def get(self, request):
        return self.list(request)
    
    def post(self, request):
        request.data['user_id']=request.user.id
        request.data['date']=datetime.now()
        return self.create(request)

    def put(self, request, id):
        data = self.partial_update(request, id=id)
        return Response({"status":data.status_code, "data":data.data})
    
    def delete(self, request, id):
        return self.destroy(request, id=id)

    # def get(self, request):
    #     serializer = NotesSerializer(Notes.objects.all(), many=True)
    #     return Response({"status":200, "payload":serializer.data})
    
    # def post(self, request):
    #     data = request.data
    #     data['date'] = datetime.now()
    #     serializer = NotesSerializer(data=data)
    #     if not serializer.is_valid():
    #         return Response({'status':403, "message":serializer.errors})
    #     serializer.save()
    #     return Response({'status':200, "payload":serializer.data})
    
    # def put(self, request):
    #     noteObj = Notes.objects.get(id=request.data['id'])
    #     serializer = NotesSerializer(noteObj, data=request.data, partial=True)
    #     if not serializer.is_valid():
    #         return Response({'status':403, "message":serializer.errors})
    #     serializer.save()
    #     return Response({'status':200, "message":"Note Updated Successfully", "payload":serializer.data})
    
    # def delete(self, request):
    #     try:
    #         Notes.objects.get(id=request.data['id']).delete()
    #         return Response({"status":200, "message":"Note deleted Successfully"})
    #     except Exception as e:
    #         return Response({"status":403, "message":"Invalid Id"})


# @api_view(['GET'])
# def fetchallnotes(request):
#     serializer = NotesSerializer(Notes.objects.all(), many=True)
#     return Response({"status":200, "payload":serializer.data})

# @api_view(['POST'])
# def add(request):
#     data = request.data
#     data['date'] = datetime.now()
#     serializer = NotesSerializer(data=data)
#     if not serializer.is_valid():
#         return Response({'status':403, "message":serializer.errors})
#     serializer.save()
#     return Response({'status':200, "payload":serializer.data})

# @api_view(['PUT'])
# def updateNote(request, id):
#     noteObj = Notes.objects.get(id=id)
#     serializer = NotesSerializer(noteObj, data=request.data, partial=True)
#     if not serializer.is_valid():
#         return Response({'status':403, "message":serializer.errors})
#     serializer.save()
#     return Response({'status':200, "message":"Note Updated Successfully", "payload":serializer.data})

# @api_view(['DELETE'])
# def deleteNote(request, id):
#     try:
#         Notes.objects.get(id=id).delete()
#         return Response({"status":200, "message":"Note deleted Successfully"})
#     except Exception as e:
#         return Response({"status":403, "message":"Invalid Id"})