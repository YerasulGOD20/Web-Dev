import json

from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from api.models import Company, Vacancy
from api.serializers import CompanySerializer, VacancySerializer


class CompanyListApi(APIView):
    def get(self, request):
        companies = Company.objects.all()
        serializer = CompanySerializer(companies, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2},
                            status=200)

    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return JsonResponse(serializer.data)


def getCompany(company_id):
    try:
        return Company.objects.get(id=company_id)
    except Company.DoesNotExist as e:
        return JsonResponse({'error': 'company doesn\'t exist'})


class CompanyDetailApi(APIView):
    def get(self, request, company_id):
        company = getCompany(company_id)
        serializer = CompanySerializer(company)

        return JsonResponse(serializer.data)

    def put(self, request, company_id):
        company = getCompany(company_id)
        serializer = CompanySerializer(company, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return JsonResponse(serializer.data)

    def delete(self, request, company_id):
        company = getCompany(company_id)
        company.delete()

        return JsonResponse({'deleted': True})



