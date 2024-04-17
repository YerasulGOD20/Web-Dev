from rest_framework import serializers

from api.models import Vacancy, Company


class CompanySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    description = serializers.CharField()
    city = serializers.CharField(max_length=50)
    address = serializers.CharField()

    def create(self, validated_data):
        return Company.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = instance.id
        instance.name = validated_data.get("name", instance.name)
        instance.description = validated_data.get("description", instance.name)
        instance.city = validated_data.get("city", instance.name)
        instance.address = validated_data.get("address", instance.name)

        instance.save()
        return instance


class VacancySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = ('id', 'name', 'description', 'salary', 'company')
