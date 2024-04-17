from django.urls import path
from api.views import *

urlpatterns = [
    path('companies/', company_view.CompanyListApi.as_view()),
    path('companies/<int:company_id>/', company_view.CompanyDetailApi.as_view()),
    path('companies/<int:company_id>/vacancies', vacancy_view.getCompanyVacancies),

    path('vacancies/', vacancy_view.vacancy_list),
    path('vacancies/<int:vacancy_id>/', vacancy_view.vacancy_detail),
    path('vacancies/top_ten', vacancy_view.vacancy_top_ten)

]