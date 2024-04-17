import { Component, OnInit } from '@angular/core';
import { Company } from '../models';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})


export class CompanyListComponent implements OnInit  {
  companies : Company[] = [];

  newName : string = '';
  newDescription : string = '';
  newCity : string = '';
  newAddress : string = '';

  constructor(private backendService : BackendService){}

  ngOnInit(): void {

    this.backendService.getCompanies().subscribe( (data : Company[])=> {
        this.companies = data
      }
    )

  }

  addCompany() {
    if (this.newName.length == 0 || this.newDescription.length == 0
      || this.newCity.length == 0 || this.newAddress.length == 0) {
      alert("Fill all fields")
    }
    else{

      this.backendService.createCompany(this.newName, this.newDescription, this.newCity, this.newAddress).subscribe((company : Company) => {
        this.companies.push(company);
        this.newName = '';
        this.newDescription = '';
        this.newCity = '';
        this.newAddress = '';
      });
    }

    
  }



  deleteCompany(company_id: number) {
    this.backendService.deleteCompany(company_id).subscribe((data) => {
      this.companies = this.companies.filter((Company) => Company.id !== company_id);
    });
  }
}
