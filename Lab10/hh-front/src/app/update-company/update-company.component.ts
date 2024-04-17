import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { ActivatedRoute } from '@angular/router';
import { Company } from '../models';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.css']
})
export class UpdateCompanyComponent implements OnInit{
  newName : string = '';
  newDescription : string = '';
  newCity : string = '';
  newAddress : string = '';
  
  company!: Company;
  company_id = 0;

  constructor(private backendService : BackendService, private route : ActivatedRoute){}


  ngOnInit(): void {
    this.getCompany()
   

  }


  getCompany(){
    this.route.paramMap.subscribe((params) =>{
      let id = params.get('id')
      if(id){
        this.company_id = +id
        this.backendService.getCompanyById(this.company_id).subscribe((company)=>{
          this.company = company;
          this.loadParams(this.company)
        })

      }
    })
  }


  loadParams(company : Company){
    this.newName = company.name;
    this.newDescription = company.description;
    this.newCity = company.city;
    this.newAddress = company.address;
  }

  updateCompany() {
    this.backendService.updateCompany(this.company_id, this.newName, this.newDescription, this.newCity, this.newAddress).subscribe((company) => {
        this.backendService.getCompanyById(this.company_id).subscribe((company) => {
          this.loadParams(company);
        })
      })
  }
}
