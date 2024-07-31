import { Injectable } from '@angular/core';
import { Registration } from '../../../models/types';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  // Example registrations data
  private registrations: Registration[] = [
    {
      unique_id: 1,
      user_name: 'Alice Johnson',
      dob: '1990-09-01',
      joining_date: '2020-01-01',
      gender: 'Female',
      photo: '', // Add photo field
      leaving_date: '', // Add leaving_date field
      father_husband_name: 'Smutt Johnson',
      father_husband_relation: 'Husband',
      mother_name: 'Emily Johnson',
      phone: '123-856-7890',
      email_id: 'alice.johnson@example.com',
      aadhar_no: '1734-5678-9101',
      pan_no: 'BCCDE1234F',
      uan: '1234567891',
      religion: 'Christianity',
      relation: 'Single',
      flats: 3,
      bank_name: 'Micchigan Bank',
      account_no: '9879543210',
      ifsc_code: 'BO000832',
      bank_address: '456 Bank Road',
      house_no: '101',
      street_no: 'Example Street',
      area: 'Down Town',
      city: 'City1',
      state: 'State1',
      country: 'Country1',
      familyMembers: [
        { name: 'John Johnson', m_dob: '2000-01-08', m_relation: 'Brother' }
      ]
    },
    {
      unique_id: 2,
      user_name: 'Steven Smith',
      dob: '1987-01-01',
      joining_date: '2021-07-07',
      gender: 'Male',
      photo: '', // Add photo field
      leaving_date: '', // Add leaving_date field
      father_husband_name: 'Davin Smith',
      father_husband_relation: 'Father',
      mother_name: 'Emiliya Johnson',
      phone: '967-456-7899',
      email_id: 'steven.smith@example.com', // Updated email to match the name
      aadhar_no: '1234-5678-9101',
      pan_no: 'ABCDE1234F',
      uan: '1234567890',
      religion: 'Christian',
      relation: 'Single',
      flats: 1,
      bank_name: 'Bank of Example',
      account_no: '9876543210',
      ifsc_code: 'BOE0001',
      bank_address: '456 Bank Road',
      house_no: '101',
      street_no: 'Town Street',
      area: 'Down Town',
      city: 'City1',
      state: 'State2',
      country: 'Country2',
      familyMembers: [
        { name: 'Jamie Smith', m_dob: '1985-01-01', m_relation: 'Brother' }
      ]
    }
  ];

  // Method to get all registrations
  getRegistrations(): Registration[] {
    return this.registrations;
  }

  // Method to add a new registration
  addRegistration(registration: Registration):void {
    try {
      this.registrations.push(registration);
      console.log("Data Added Successfully");
    } catch (error) {
      console.log("error while adding data"+error)
    }
  }

  // Method to update an existing registration
  editRegistration(updatedRegistration: Registration): void {
    const index = this.registrations.findIndex(
      reg => reg.unique_id === updatedRegistration.unique_id
    );
    if (index !== -1) {
      this.registrations[index] = updatedRegistration;
    }

  }

  // Method to delete a registration
  deleteRegistration(uniqueId: number) {
    this.registrations = this.registrations.filter(
      reg => reg.unique_id !== uniqueId
    );
  }

  // Method to get a registration by ID
  getRegistrationById(uniqueId: number): Registration | undefined {
    return this.registrations.find(
      reg => reg.unique_id === uniqueId
    );
  }
}
