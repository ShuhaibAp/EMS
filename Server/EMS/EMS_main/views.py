from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet,ViewSet
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import permissions,authentication
from rest_framework.decorators import action
# Create your views here.

class RegView(ViewSet):
    permission_classes=[permissions.AllowAny]

    def create(self,request,*args,**kwargs):
        serializer=RegisterSerial(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        else:
            return Response(data=serializer.errors)

class ChangePasswordView(ViewSet):
    permission_classes=[permissions.IsAuthenticated]

    @action(detail=False, methods=['PUT'])
    def change_pass(self,request):
        serializer=ChangepasswordSerial(data=request.data, context={'request': request})
        if serializer.is_valid():
            user=request.user
            user.set_password(serializer.validated_data['new_pass'])
            user.save()
            return Response({"message":"Password Updated"})
        return Response(serializer.errors)
    
# UserProfile ViewSet
class UserProfileView(ViewSet):
    permission_classes=[permissions.IsAuthenticated]

    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        # Check if the profile already exists
        if UserProfile.objects.filter(user=request.user).exists():
            return Response({"detail": "Profile already exists."})

        # Create new profile
        serializer = UserProfileSerial(data=request.data)
        if serializer.is_valid():
            # Set the user to the logged-in user
            serializer.save(user=request.user)
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    @action(detail=False, methods=['GET'])
    def view_profile(self, request):
        user_profile=UserProfile.objects.get(user=request.user)
        serializer=UserProfileSerial(user_profile)
        return Response(serializer.data)

class FormView(ModelViewSet):
    queryset=Form.objects.all()
    serializer_class=FormSerializer
    permission_classes=[permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def fields(self, request, pk=None):
        try:
            form=Form.objects.get(id=pk)
        except Form.DoesNotExist:
            return Response({"detail": "Form not found"})

        if form.user!=request.user:
            return Response({"detail": "You do not have permission to add fields to this form."})
        
        data = request.data
        if not isinstance(data, list):
            return Response({"detail": "Expected a list of fields."})

        created_fields=[]
        for field_data in data:
            field_data["form"]=pk   
            serializer=FieldsSerializer(data=field_data)
            
            if serializer.is_valid():
                field=serializer.save()
                created_fields.append(serializer.data)
            else:
                return Response(serializer.errors)
        return Response(created_fields)


    @action(detail=True, methods=['post'])
    def employees(self, request, pk=None):
        try:
            form=Form.objects.get(id=pk)
        except Form.DoesNotExist:
            return Response({"detail": "Form not found"})

        if form.user!=request.user:
            return Response({"detail": "You do not have permission to add employees to this form."})

        # Validate field data
        field_data=request.data.get("fields")
        if not isinstance(field_data, list):
            return Response({"detail": "Fields data must be a list."})
        for field in field_data:
            field_id=field.get('field_id')
            value=field.get('value')
            try:
                Fields.objects.get(id=field_id, form=form)
            except Fields.DoesNotExist:
                return Response({"detail": f"Field with id {field_id} not found."})

        employee=Employee.objects.create(form=form, field_data=field_data)

        employee_serializer=EmployeeSerializer(employee)
        return Response(employee_serializer.data)


class EmployeeView(ModelViewSet):
    queryset=Employee.objects.all()
    serializer_class=EmployeeSerializer
    permission_classes=[permissions.IsAuthenticated]

    @action(detail=True, methods=['get'])
    def employees_by_form(self, request, pk=None):
        employees = Employee.objects.filter(form=pk)
        serializer = self.get_serializer(employees, many=True)
        return Response(serializer.data)