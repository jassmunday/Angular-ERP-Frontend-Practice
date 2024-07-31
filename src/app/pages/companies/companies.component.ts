import { Component } from '@angular/core';
import { Company } from '../../../../models/types';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-companies',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.css'
})
export class CompaniesComponent {

  companies: Company[];

  constructor(private companyService: CompanyService, private router: Router) {
    this.companies = this.companyService.getCompanies();
  }

  deleteCompany(code: string) {
    this.companyService.deleteCompany(code);
    this.companies = this.companyService.getCompanies(); // Refresh the list after deletion
  }

  editCompany(company: Company) {
    this.router.navigate(['/edit-company', company.code]);
  }

  addNewCompany() {
    this.router.navigate(['/add-company']);
  }

}
