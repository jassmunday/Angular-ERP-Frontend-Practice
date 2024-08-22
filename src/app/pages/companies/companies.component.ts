import { Component } from '@angular/core';
import { Company } from '../../../../models/types';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

  companies: Company[] = [];

  constructor(private companyService: CompanyService, private router: Router, private toastService: ToastService) {
  }
  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies(){
    this.companyService.getAllCompanies().subscribe((companies)=> {
      this.companies = companies;
      console.log(this.companies)
    })
  }

  deleteCompany(_id: string | undefined ) {
    console.log(_id);
    if (_id) {
      this.companyService.deleteCompany(_id).subscribe(() => {
        this.loadCompanies();
        this.toastService.showWarning('Company Deleted');
        console.log(this.loadCompanies());
      });
    } else {
      console.error('Invalid Company ID');
    }
  }
  
  editCompany(_id: string | undefined) {
    this.router.navigate(['/edit-company', _id]);
  }

  addNewCompany() {
    this.router.navigate(['/add-company']);
  }

}
