import { Injectable } from '@angular/core';
import { Role,RolePermissions } from '../../../models/types';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionsService {
  // Example roles data
  private roles: Role[] = [
    {
      role: 'Admin',
      rolePermissions: [
        {
          controller_name: 'Users Controller',
          controller_action: 'Manage Users',
          add: true,
          read: true,
          edit: false,
          delete: false,
        },
        {
          controller_name: 'Regsitrations Controller',
          controller_action: 'Manage Register',
          add: true,
          read: true,
          edit: false,
          delete: false,
        },
        {
          controller_name: 'Categories Controller',
          controller_action: 'Manage Categories',
          add: false,
          read: true,
          edit: true,
          delete: false,
        },
        {
          controller_name: 'Relations Controller',
          controller_action: 'Manage Relations',
          add: false,
          read: false,
          edit: false,
          delete: true,
        },
      ],
    },
    {
      role: 'User',
      rolePermissions: [
        {
          controller_name: 'Users Controller',
          controller_action: 'Manage Users',
          add: true,
          read: true,
          edit: false,
          delete: false,
        },
        {
          controller_name: 'Registrations Controller',
          controller_action: 'Manage',
          add: true,
          read: true,
          edit: true,
          delete: false,
        },
        {
          controller_name: 'Relations Controller',
          controller_action: 'Overview',
          add: false,
          read: true,
          edit: false,
          delete: false,
        },
        {
          controller_name: 'Religions Controller',
          controller_action: 'Access',
          add: true,
          read: true,
          edit: true,
          delete: true,
        },
        {
          controller_name: 'Categories Controller',
          controller_action: 'Manage Categories',
          add: true,
          read: true,
          edit: true,
          delete: true,
        },
      ],
    },
  ];

  constructor() {}

  // Method to get all roles
  getRoles(): Role[] {
    return this.roles;
  }

  // Method to add a new role
  addRole(role: Role): void {
    try {
      this.roles.push(role);
      console.log("Role Added Successfully");
    } catch (error) {
      console.log("Error while adding role: " + error);
    }
  }

  
  // Method to update an existing role's permissions
  editRolePermissions(updatedRole: Role): void {
    const index = this.roles.findIndex(r => r.role === updatedRole.role);
    if (index !== -1) {
      this.roles[index] = updatedRole;
      console.log("Role Permissions Updated Successfully");
    } else {
      console.log("Role not found");
    }
  }

  // Method to delete a role
  deleteRole(roleName: string): void {
    this.roles = this.roles.filter(r => r.role !== roleName);
    console.log("Role Deleted Successfully");
  }

  // Method to get a role by name
  getRoleByName(roleName: string): Role | undefined {
    return this.roles.find(r => r.role === roleName);
  }

  // Method to get permissions by role name
  getPermissionsByRole(roleName: string): RolePermissions[] | undefined {
    const role = this.getRoleByName(roleName);
    return role ? role.rolePermissions : undefined;
  }

}
