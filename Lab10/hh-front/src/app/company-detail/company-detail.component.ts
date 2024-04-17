import { Component, OnInit } from '@angular/core';
import { Company, Vacancy } from '../models';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit{

  company!: Company;
  company_id = 0;
  vacancies_of_company : Vacancy[] = [];

  vacancies : Vacancy[] = [];

  
  newName : string = '';
  newDescription : string = '';
  newSalary : number = 0;
  newCompany : number = 0;


  constructor(private backendService: BackendService, private route : ActivatedRoute){}
  
  ngOnInit(): void {
    this.company = {} as Company  
    this.getCompany()

    this.backendService.getVacanciesByCompanyId(this.company_id).subscribe((data : Vacancy[]) =>{
      this.vacancies_of_company = data;
    })

    this.backendService.getVacancies().subscribe((data : Vacancy[])=>{
      this.vacancies = data;
    })

    this.newCompany = this.company_id;

  }

  getCompany(){
    this.route.paramMap.subscribe((params) =>{
      let id = params.get('id')
      if(id){
        this.company_id = +id
        this.backendService.getCompanyById(this.company_id).subscribe((company)=>{
          this.company = company;
        })

      }
    })
  }


  addVacancy() {
    if (this.newName.length == 0 || this.newDescription.length == 0
      || this.newSalary == 0 || this.newCompany == 0) {
      alert("Fill all fields")
    }
    else{
      
      this.backendService.createVacancy(this.newName, this.newDescription, this.newSalary, this.newCompany).subscribe((vacancy: Vacancy) => {
        this.vacancies_of_company.push(vacancy);
        this.newName = '';
        this.newDescription = '';
        this.newSalary = 0;
        this.newCompany = this.company_id;
      });
    }
  }

  deleteVacancy(vacancy_id: number) {
    this.backendService.deleteVacancy(vacancy_id).subscribe((data) => {
      this.vacancies_of_company = this.vacancies_of_company.filter((Vacancy) => Vacancy.id !== vacancy_id);
    });
  }

}
