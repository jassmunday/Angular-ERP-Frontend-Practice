import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../services/registration.service';
import { RelationService } from '../../services/relation.service';
import { CommonModule } from '@angular/common';
import { Registration } from '../../../../models/types';

type FamilyMemberFormGroup = FormGroup<{
  name: FormControl<string>;
  m_dob: FormControl<string>;
  m_relation: FormControl<string>;
}>;



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  relations: string[];
  registration: Registration[];

  isEditMode: boolean = false;

  states: string[] = ['State1', 'State2', 'State3'];
  cities: string[] = ['City1', 'City2', 'City3'];
  countries: string[] = ['Country1', 'Country2', 'Country3'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private registrationService: RegistrationService,
    private relationService: RelationService
  ) {
    this.relations = this.relationService.getRelations();
    this.registration = this.registrationService.getRegistrations();

    this.registrationForm = new FormGroup({
      unique_id: new FormControl(null, Validators.required),
      user_name: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      joining_date: new FormControl('', Validators.required),
      gender: new FormControl('select', Validators.required),
      photo: new FormControl(''),
      leaving_date: new FormControl(''),
      father_husband_name: new FormControl('', Validators.required),
      father_husband_relation: new FormControl('Father', Validators.required),
      mother_name: new FormControl('', Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9-]+$'),
      ]),
      email_id: new FormControl('', [Validators.required, Validators.email]),
      aadhar_no: new FormControl('', Validators.required),
      pan_no: new FormControl('', Validators.required),
      uan: new FormControl('', Validators.required),
      religion: new FormControl('', Validators.required),
      relation: new FormControl('', Validators.required),
      flats: new FormControl('', Validators.required),
      bank_name: new FormControl('', Validators.required),
      account_no: new FormControl('', Validators.required),
      ifsc_code: new FormControl('', Validators.required),
      bank_address: new FormControl('', Validators.required),
      house_no: new FormControl('', Validators.required),
      street_no: new FormControl('', Validators.required),
      area: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      familyMembers: new FormArray<FamilyMemberFormGroup>([]),
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.isEditMode = true;
        this.loadRegistrationData(id);
      }
    });
  }

  get familyMembers() {
    return this.registrationForm.get(
      'familyMembers'
    ) as FormArray<FamilyMemberFormGroup>;
  }

  addFamilyMember() {
    this.familyMembers.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        m_dob: new FormControl('', Validators.required),
        m_relation: new FormControl('', Validators.required),
      }) as FamilyMemberFormGroup
    );
  }

  removeFamilyMember(index: number) {
    this.familyMembers.removeAt(index);
  }

  submit() {

    if (this.registrationForm.valid) {

      const registrationData = this.registrationForm.value;

      if (!this.isEditMode) {

        this.registrationService.addRegistration(registrationData);
        console.log(this.registration);
        console.log('Registration Data:', registrationData, this.registration);

      } else {

        this.registrationService.editRegistration(registrationData);
        console.log('Registration Data:', registrationData, this.registration);

      }

      console.log('Registration Data:', registrationData, this.registration);
      this.router.navigate(['/registrations-list']);

    } else {

      console.log('Incomplete Data', this.registration);

    }
  }

  cancel() {
    this.router.navigate(['/registrations-list']);
  }

  private loadRegistrationData(id: number) {
    const registration = this.registrationService.getRegistrationById(id);
    if (registration) {
      this.registrationForm.setValue({
        unique_id: registration.unique_id,
        user_name: registration.user_name,
        dob: registration.dob,
        joining_date: registration.joining_date,
        gender: registration.gender,
        photo: registration.photo,
        leaving_date: registration.leaving_date,
        father_husband_name: registration.father_husband_name,
        father_husband_relation: registration.father_husband_relation,
        mother_name: registration.mother_name,
        phone: registration.phone,
        email_id: registration.email_id,
        aadhar_no: registration.aadhar_no,
        pan_no: registration.pan_no,
        uan: registration.uan,
        religion: registration.religion,
        relation: registration.relation,
        flats: registration.flats,
        bank_name: registration.bank_name,
        account_no: registration.account_no,
        ifsc_code: registration.ifsc_code,
        bank_address: registration.bank_address,
        house_no: registration.house_no,
        street_no: registration.street_no,
        area: registration.area,
        city: registration.city,
        state: registration.state,
        country: registration.country,
        familyMembers: [], // Initialize empty array
      });
      // Populate familyMembers after form is set
      const familyArray = this.registrationForm.get(
        'familyMembers'
      ) as FormArray;
      registration.familyMembers.forEach((member) => {
        const memberGroup = new FormGroup({
          name: new FormControl(member.name, Validators.required),
          m_dob: new FormControl(member.m_dob, Validators.required),
          m_relation: new FormControl(member.m_relation, Validators.required),
        });
        familyArray.push(memberGroup);
      });
    }
  } 
}
