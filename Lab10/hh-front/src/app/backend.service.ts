import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company, Vacancy } from './models';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  BASE_URL = "http://127.0.0.1:8000"

  constructor(private client: HttpClient) { }


  getCompanies(): Observable<Company[]> {
    return this.client.get<Company[]>(`${this.BASE_URL}/api/companies`)
  }

  getVacancies(): Observable<Vacancy[]> {
    return this.client.get<Vacancy[]>(`${this.BASE_URL}/api/vacancies`)
  }



  getCompanyById(id:number):Observable<Company>{
    return this.client.get<Company>(`${this.BASE_URL}/api/companies/${id}`)
  }


  getVacancyById(id:number):Observable<Vacancy>{
    return this.client.get<Vacancy>(`${this.BASE_URL}/api/vacancies/${id}`)
  }



  getVacanciesByCompanyId(id:number): Observable<Vacancy[]> {
    return this.client.get<Vacancy[]>(`${this.BASE_URL}/api/companies/${id}/vacancies`)
  }


  createCompany(name: string, description: string, city:string, address: string): Observable<Company> {
    return this.client.post<Company>( `${this.BASE_URL}/api/companies/`,
      { 
        name: name, 
        description: description, 
        city: city, 
        address: address
      }
    );
  }

  updateCompany(id: number, name: string, description: string, city:string, address: string): Observable<Company> {
    return this.client.put<Company>( `${this.BASE_URL}/api/companies/${id}/`,
      { 
        name: name, 
        description: description, 
        city: city, 
        address: address
      }
    );
  }

  deleteCompany(company_id: number): Observable<any> {
    return this.client.delete(`${this.BASE_URL}/api/companies/${company_id}/`)
  }




  createVacancy(name: string, description: string, salary : number, companyId: number): Observable<Vacancy> {
    return this.client.post<Vacancy>( `${this.BASE_URL}/api/vacancies/`,
      { 
        name: name, 
        description: description, 
        salary : salary,
        company: companyId
      }
    );
  }

  updateVacancy(id: number, name: string, description: string,salary : number, companyId: number ): Observable<Vacancy> {
    return this.client.put<Vacancy>( `${this.BASE_URL}/api/vacancies/${id}/`,
      { 
        name: name, 
        description: description, 
        salary : salary,
        company: companyId
      }
    );
  }


  deleteVacancy(vacancy_id: number): Observable<any> {
    return this.client.delete(
      `${this.BASE_URL}/api/vacancies/${vacancy_id}/`
    )
  }

}
