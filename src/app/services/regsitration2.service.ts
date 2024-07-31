import { Injectable } from '@angular/core';
import { Registration2 } from '../../../models/types';
import { FamilyMember } from '../../../models/types';
// Define the FamilyMember type
// export type FamilyMember = {
//   name: string;
//   m_dob: string;
//   m_relation: string;
// };

@Injectable({
  providedIn: 'root',
})
export class Regsitration2Service {

  // Example registrations data for Registration2
  private registrations: Registration2[] = [
    {
      id: 1,
      user_name: 'Alice Johnson',
      joining_date: '2023-01-15',
      gender: 'Female',
      email_id: 'alice.johnson@example.com',
      phone: '123-456-7890',
      father_husband_name: 'Robert Johnson',
      father_husband_relation: 'Father',
      familyMembers: [
        { name: 'John Johnson', m_dob: '2000-01-08', m_relation: 'Brother' }
      ]
    },
    {
      id: 2,
      user_name: 'Steven Smith',
      joining_date: '2022-05-20',
      gender: 'Male',
      email_id: 'steven.smith@example.com',
      phone: '987-654-3210',
      father_husband_name: 'William Smith',
      father_husband_relation: 'Father',
      familyMembers: [
        { name: 'Jamie Smith', m_dob: '1985-01-01', m_relation: 'Brother' }
      ]
    }
  ];

  // Method to get all registrations
  getRegistrations(): Registration2[] {
    return this.registrations;
  }

  // Method to add a new registration
  addRegistration(registration: Registration2): void {
    try {
      this.registrations.push(registration);
      console.log('Data Added Successfully');
    } catch (error) {
      console.log('Error while adding data: ' + error);
    }
  }

  // Method to update an existing registration
  editRegistration(updatedRegistration: Registration2): void {
    const index = this.registrations.findIndex(
      reg => reg.id === updatedRegistration.id
    );
    if (index !== -1) {
      this.registrations[index] = updatedRegistration;
    }
  }

  // Method to delete a registration
  deleteRegistration(id: number): void {
    this.registrations = this.registrations.filter(
      reg => reg.id !== id
    );
  }

  // Method to get a registration by ID
  getRegistrationById(id: number): Registration2 | undefined {
    return this.registrations.find(
      reg => reg.id === id
    );
  }
}
