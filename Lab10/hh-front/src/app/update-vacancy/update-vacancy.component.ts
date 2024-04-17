import { Component, OnInit } from '@angular/core';
import { Company, Vacancy } from '../models';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { VacancyListComponent } from '../vacancy-list/vacancy-list.component';

@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrls: ['./update-vacancy.component.css']
})
export class UpdateVacancyComponent implements OnInit{
  vacancy!: Vacancy;
  vacancy_id = 0;

  companies : Company[] = []

  newName : string = '';
  newDescription : string = '';
  newSalary : number = 0;
  newCompany : number = 0;


  constructor(private backendService : BackendService, private route : ActivatedRoute){}


  ngOnInit(): void {
    this.getVacancy()
    
    this.backendService.getCompanies().subscribe( (data : Company[])=> {
      this.companies = data
      }
    )

  }


  getVacancy(){
    this.route.paramMap.subscribe((params) =>{
      let id = params.get('id')
      if(id){
        this.vacancy_id = +id
        this.backendService.getVacancyById(this.vacancy_id).subscribe((vacancy)=>{
          this.vacancy = vacancy;
          this.loadParams(this.vacancy)
        })

      }
    })
  }


  loadParams(vacancy:Vacancy){
    this.newName = vacancy.name;
    this.newDescription = vacancy.description;
    this.newSalary = vacancy.salary;
    this.newCompany = vacancy.company;
  }

  updateVacancy() {
    this.backendService.updateVacancy(this.vacancy_id, this.newName, this.newDescription, this.newSalary, this.newCompany).subscribe((vacancy) => {
        this.backendService.getVacancyById(this.vacancy_id).subscribe((vacancy) => {
          this.loadParams(vacancy);
        })
      })
  }
}
