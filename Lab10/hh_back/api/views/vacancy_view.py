import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view

from api.models import Vacancy
from api.serializers import VacancySerializer


@api_view(['GET', 'POST'])
def vacancy_list(request):
    if request.method == 'GET':
        vacancies = Vacancy.objects.all()
        serializer = VacancySerializer(vacancies, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2})
    if request.method == 'POST':
        serializer = VacancySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return JsonResponse(serializer.data)

def getVacancy(vacancy_id):
    try:
        return Vacancy.objects.get(id=vacancy_id)
    except Vacancy.DoesNotExist as e:
        return JsonResponse({'error': 'vacancy doesn\'t exist'})


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def vacancy_detail(request, vacancy_id):
    if request.method == 'GET':
        vacancy = getVacancy(vacancy_id)
        serializer = VacancySerializer(vacancy)
        return JsonResponse(serializer.data)

    if request.method == 'PUT':
        vacancy = getVacancy(vacancy_id)
        serializer = VacancySerializer(vacancy, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    if request.method == 'DELETE':
        vacancy = getVacancy(vacancy_id)
        vacancy.delete()
        return JsonResponse({'deleted': True})


def vacancy_top_ten(request):
    if request.method == 'GET':
        top_ten_vacancies = Vacancy.objects.order_by('-salary')[:10]
        serializer = VacancySerializer(top_ten_vacancies, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2})


def getCompanyVacancies(request, company_id):
    if request.method == 'GET':
        vacancies = Vacancy.objects.all().filter(company_id=company_id)
        serializer= VacancySerializer(vacancies, many=True)

        return JsonResponse(serializer.data, safe=False)