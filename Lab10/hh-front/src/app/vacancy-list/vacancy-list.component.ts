import { Component, OnInit } from '@angular/core';
import { Company, Vacancy } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})
export class VacancyListComponent implements OnInit {
  vacancies : Vacancy[] = [];

  newName : string = '';
  newDescription : string = '';
  newSalary : number = 0;
  newCompany : number = 0;

  companies : Company[] = [];


  

  constructor(private backendService : BackendService){}

  ngOnInit(): void {

    this.backendService.getVacancies().subscribe( (data : Vacancy[])=> {
        this.vacancies = data
      }
    )

    this.backendService.getCompanies().subscribe( (data : Company[])=> {
      this.companies = data
      }
    )


  }

  addVacancy() {
    if (this.newName.length == 0 || this.newDescription.length == 0
      || this.newSalary == 0 || this.newCompany == 0) {
      alert("Fill all fields")
    }
    else{
      
      this.backendService.createVacancy(this.newName, this.newDescription, this.newSalary, this.newCompany).subscribe((vacancy: Vacancy) => {
        this.vacancies.push(vacancy);
        this.newName = '';
        this.newDescription = '';
        this.newSalary = 0;
        this.newCompany = 0;
      });
    }

    
  }

    // getCompanyDetail(){
    //     this.backendService.getCompanyById()
    // }

  deleteVacancy(vacancy_id: number) {
    this.backendService.deleteVacancy(vacancy_id).subscribe((data) => {
      this.vacancies = this.vacancies.filter((Vacancy) => Vacancy.id !== vacancy_id);
    });
  }
}
