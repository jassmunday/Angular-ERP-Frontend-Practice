export type Company = {
  code: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  md_name: string;
  md_address?: string;
  md_mobile: string;
  md_designation: string;
  bank_name: string;
  account: string;
  ifsc_code: string;
  branch_name: string;
  branch_address: string;
  pf_applicable?: boolean;
  pf_number?: string;
  pf_user_id?: string;
  pf_password?: string;
  pf_rate?: number;
  pf_website?: string;
  esi_applicable?: boolean;
  esi_number?: string;
  esi_user_id?: string;
  esi_password?: string;
  esi_rate?: number;
  esi_website?: string;
  lwf_applicable?: boolean;
  lwf_number?: string;
  lwf_user_id?: string;
  lwf_password?: string;
  lwf_employer_rate?: number;
  lwf_employee_rate?: number;
  lwf_website?: string;
};

//src/app/models/types.ts
export type FamilyMember =  {
  name: string;
  m_dob?: string;
  m_relation: string;
}

export type Registration = {
  unique_id: number;
  user_name: string;
  dob: string;
  joining_date: string;
  gender: string;
  photo?: string; // Include photo field
  leaving_date?: string; // Include leaving_date field
  father_husband_name: string;
  father_husband_relation: string;
  mother_name: string;
  phone: string;
  email_id: string;
  aadhar_no: string;
  pan_no: string;
  uan: string;
  religion: string;
  relation: string;
  flats: number;
  bank_name: string;
  account_no: string;
  ifsc_code: string;
  bank_address: string;
  house_no: string;
  street_no: string;
  area: string;
  city: string;
  state: string;
  country: string;
  familyMembers: FamilyMember[];
}

export type Registration2 = {
  id: number;
  user_name: string;
  joining_date: string;
  gender: string;
  email_id: string;
  phone: string;
  father_husband_name: string;
  father_husband_relation: string;
  familyMembers: FamilyMember[];
}

export type Flats = {
  flat_no: number,
  flat_fee: number
}


export type User = {
  full_name:string,
  user_name: string,
  password:string,
  role:string,
  email:string,
  email_password:string,
  mobile_no:string,
  photo:string
  company:string
}

export type Menu = {
  parent_name:string,
  menu_name:string,
  controller_name: string,
  action_name:string,
  link_address:string
}

export type RolePermissions = {
  controller_name:string,
  controller_action:string,
  add?:boolean,
  read?:boolean
  edit?:boolean,
  delete?:boolean,
}

export type Role = {
  role:string,
  rolePermissions: RolePermissions []
}