import { Injectable } from '@angular/core';
import { Company } from '../../../models/types';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companies: Company[] = [
    {
      code: 'C001',
      name: 'Tech Corp',
      address: '123 Tech Street',
      city: 'New York',
      state: 'NY',
      phone: '123-456-7890',
      email: 'contact@techcorp.com',
      md_name: 'John Doe',
      md_address: '456 CEO Avenue',
      md_mobile: '555-1234',
      md_designation: 'CEO',
      bank_name: 'Tech Bank',
      account: '1234567890',
      ifsc_code: 'TB0001',
      branch_name: 'Main Branch',
      branch_address: '123 Finance Road',
      pf_applicable: true,
      pf_number: 'PF123456',
      pf_user_id: 'user123',
      pf_password: 'securePass123',
      pf_rate: 12.5,
      pf_website: 'http://pf.example.com',
      esi_applicable: true,
      esi_number: 'ESI123456',
      esi_user_id: 'esiUser123',
      esi_password: 'esiPass123',
      esi_rate: 4.75,
      esi_website: 'http://esi.example.com',
      lwf_applicable: false,
      lwf_number: '',
      lwf_user_id: '',
      lwf_password: '',
      lwf_employer_rate: 0,
      lwf_employee_rate: 0,
      lwf_website: ''
    },
    {
      code: 'C002',
      name: 'Innovate Ltd',
      address: '456 Innovation Blvd',
      city: 'San Francisco',
      state: 'CA',
      phone: '987-654-3210',
      email: 'info@innovatelt.com',
      md_name: 'Jane Smith',
      md_address: '789 Executive Dr',
      md_mobile: '555-9876',
      md_designation: 'Managing Director',
      bank_name: 'Innovate Bank',
      account: '0987654321',
      ifsc_code: 'IB0002',
      branch_name: 'Innovation Branch',
      branch_address: '456 Business Lane',
      pf_applicable: false,
      pf_number: '',
      pf_user_id: '',
      pf_password: '',
      pf_rate: 0 ,
      pf_website: '',
      esi_applicable: true,
      esi_number: 'ESI654321',
      esi_user_id: 'esiUser654',
      esi_password: 'esiPass654',
      esi_rate: 4.75,
      esi_website: 'http://esi.innovate.com',
      lwf_applicable: true,
      lwf_number: 'LWF987654',
      lwf_user_id: 'lwfUser987',
      lwf_password: 'lwfPass987',
      lwf_employer_rate: 2,
      lwf_employee_rate: 1,
      lwf_website: 'http://lwf.example.com'
    },
  ];

  getCompanies(): Company[] {
    return this.companies;
  }

  addCompany(company: Company): void {
    this.companies.push(company);
  }

  updateCompany(updatedCompany: Company): void {
    const index = this.companies.findIndex(company => company.code === updatedCompany.code);
    if (index !== -1) {
      this.companies[index] = updatedCompany;
    }
  }

  deleteCompany(code: string): void {
    this.companies = this.companies.filter(company => company.code !== code);
  }

  getCompanyByCode(code: string): Company | undefined {
    return this.companies.find(company => company.code === code);
  }
}
