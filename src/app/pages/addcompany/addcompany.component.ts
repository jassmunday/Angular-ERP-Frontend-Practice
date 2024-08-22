import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../../../models/types';
import { ToastrService } from 'ngx-toastr';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-addcompany',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  combinedForm: FormGroup;
  companies:  Company[] = [];
  isEditMode: boolean = false;
  currentCompanyId: string  = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
    private toastService: ToastService ) {
    this.combinedForm = new FormGroup({
      // Company details
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9-]+$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      
      // Managing director details
      md_name: new FormControl('', Validators.required),
      md_address: new FormControl('', Validators.required),
      md_mobile: new FormControl('', [Validators.required, Validators.pattern('^[0-9-]+$')]),
      md_designation: new FormControl('', Validators.required),

      // Bank details
      bank_name: new FormControl('', Validators.required),
      account: new FormControl('', Validators.required),
      ifsc_code: new FormControl('', Validators.required),
      branch_name: new FormControl('', Validators.required),
      branch_address: new FormControl('', Validators.required),

      // Provident Fund details
      pf_applicable: new FormControl(false),
      pf_number: new FormControl(''),
      pf_user_id: new FormControl(''),
      pf_password: new FormControl(''),
      pf_rate: new FormControl(0),
      pf_website: new FormControl(''),

      // Employees' State Insurance details
      esi_applicable: new FormControl(false),
      esi_number: new FormControl(''),
      esi_user_id: new FormControl(''),
      esi_password: new FormControl(''),
      esi_rate: new FormControl(0),
      esi_website: new FormControl(''),

      // Labour Welfare Fund details
      lwf_applicable: new FormControl(false),
      lwf_number: new FormControl(''),
      lwf_user_id: new FormControl(''),
      lwf_password: new FormControl(''),
      lwf_employee_rate: new FormControl(0),
      lwf_employer_rate: new FormControl(0),
      lwf_website: new FormControl('')
    });
  }

  loadCompanies(){
    this.companyService.getAllCompanies().subscribe((data)=> {
      this.companies = data;
      console.log(this.companies);
    })
  }

  ngOnInit() {
    this.loadCompanies();

    this.route.paramMap.subscribe(params => {
      const id = params.get('_id');

      if (id) {
        this.isEditMode = true;
        this.loadCompanyData(id);
        this.currentCompanyId = id;
      }
    });
  }

  
  loadCompanyData(id: string) {
    this.companyService.getCompanyById(id).subscribe((company) => {
      this.combinedForm.setValue({
        code: company.code,
        name: company.name,
        address: company.address,
        city: company.city,
        state: company.state,
        phone: company.phone,
        email: company.email,
        md_name: company.md_name,
        md_address: company.md_address,
        md_mobile: company.md_mobile,
        md_designation: company.md_designation,
        bank_name: company.bank_name,
        account: company.account,
        ifsc_code: company.ifsc_code,
        branch_name: company.branch_name,
        branch_address: company.branch_address,
        pf_applicable: company.pf_applicable,
        pf_number: company.pf_number,
        pf_user_id: company.pf_user_id,
        pf_password: company.pf_password,
        pf_rate: company.pf_rate,
        pf_website: company.pf_website,
        esi_applicable: company.esi_applicable,
        esi_number: company.esi_number,
        esi_user_id: company.esi_user_id,
        esi_password: company.esi_password,
        esi_rate: company.esi_rate,
        esi_website: company.esi_website,
        lwf_applicable: company.lwf_applicable,
        lwf_number: company.lwf_number,
        lwf_user_id: company.lwf_user_id,
        lwf_password: company.lwf_password,
        lwf_employee_rate: company.lwf_employee_rate,
        lwf_employer_rate: company.lwf_employer_rate,
        lwf_website: company.lwf_website
      });
    }) 
  }

  onSubmit() {
    console.log(this.combinedForm.value);
    
    if (this.combinedForm.valid) {

      const formData = this.combinedForm.value;

      console.log(formData);

      if (! this.isEditMode) {
        this.companyService.addCompany(formData).subscribe(() => {
          this.loadCompanies(); 
          console.log('Company Added');
          this.router.navigate(['/masters/companies']);
        
          this.toastService.showSuccess('Company Added');
        })
      } else {
        this.companyService.updateCompany(formData,this.currentCompanyId).subscribe(() => {
          this.loadCompanies(); 
          console.log('Company Updated');
          this.isEditMode = false;
          this.currentCompanyId = '';
          this.toastService.showSuccess('Company Updated');
          this.router.navigate(['/masters/companies']);
          
        })
      }
      this.loadCompanies(); 
      this.isEditMode=false;
      this.currentCompanyId = '';
      this.router.navigate(['/masters/companies']);
    }else{
      console.log('Invalid or Incomplete Data')
      this.toastService.showError('Errow while Submitting');
    }
  }

  cancel() {
    this.router.navigate(['/masters/companies']);
    this.toastService.showInfo('No Updation or Addition');
  }
}
