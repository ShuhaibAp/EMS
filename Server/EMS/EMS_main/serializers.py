from rest_framework import serializers
from .models import *

class RegisterSerial(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["username","email","password"]
    
    def create(self,validated_data):
        return User.objects.create_user(**validated_data)

class ChangepasswordSerial(serializers.Serializer):
    old_pass=serializers.CharField(required=True)
    new_pass=serializers.CharField(required=True)

    def validate_old_pass(self,value):
        user=self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Your password is incorrect")     
        return value
    def validate_new_pass(self,value):
        if len(value)<8:
            raise serializers.validationError("Password must be atleast 8 characters")
        return value

class UserProfileSerial(serializers.ModelSerializer):
    class Meta:
        model=UserProfile
        fields=['bio','image','user']
        read_only_fields=['user']


class FormSerializer(serializers.ModelSerializer):
    class Meta:
        model=Form
        fields=['id', 'fname', 'user']
        read_only_fields=['user']

class FieldsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fields
        fields = ['id','label','input_type','order','form']

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employee
        fields=['id', 'form','field_data']
        read_only_fields=['profile']
