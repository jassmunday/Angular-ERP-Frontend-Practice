import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Registration2, FamilyMember } from '../../../../models/types';
import { Regsitration2Service } from '../../services/regsitration2.service';

type FamilyMemberFormGroup = FormGroup<{
  name: FormControl<string>;
  m_relation: FormControl<string>;
}>;

@Component({
  selector: 'app-registration2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registration2.component.html',
  styleUrls: ['./registration2.component.css'],
})

export class Registration2Component implements OnInit {
  registrationForm: FormGroup;
  registration: Registration2[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private registrationService: Regsitration2Service

  ) {

    this.registration = this.registrationService.getRegistrations();

    this.registrationForm = new FormGroup({
      id: new FormControl(0, Validators.required),
      user_name: new FormControl('', Validators.required),
      email_id: new FormControl('', [Validators.required, Validators.email]),
      joining_date: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      father_husband_name: new FormControl('', Validators.required),
      father_husband_relation: new FormControl('', Validators.required),
      familyMembers: new FormArray<FamilyMemberFormGroup>([]),
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadRegistrationData(id);
      }
    });
  }

  get familyMembers() {
    return this.registrationForm.get('familyMembers') as FormArray<FamilyMemberFormGroup>;
  }

  addFamilyMember() {
    this.familyMembers.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
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
      this.registrationService.addRegistration(registrationData);

      console.log(this.registration);
      console.log('Registration Data:', registrationData, this.registration);
    } else {
      console.log('Incomplete Data', this.registration);
    }
  }

  private loadRegistrationData(id: number) {
    const registration = this.registrationService.getRegistrationById(id);
    if (registration) {
      this.registrationForm.setValue({
        id: registration.id,
        user_name: registration.user_name,
        email_id: registration.email_id,
        joining_date: registration.joining_date,
        gender: registration.gender,
        phone: registration.phone,
        father_husband_name: registration.father_husband_name,
        father_husband_relation: registration.father_husband_relation,
        familyMembers: [],
      });
      // Populate familyMembers after form is set
      const familyArray = this.registrationForm.get('familyMembers') as FormArray;
      registration.familyMembers.forEach(member => {
        const memberGroup = new FormGroup({
          name: new FormControl(member.name, Validators.required),
          m_relation: new FormControl(member.m_relation, Validators.required),
        });
        familyArray.push(memberGroup);
      });
    }
  }
}
