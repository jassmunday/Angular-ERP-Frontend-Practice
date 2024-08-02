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
import { FormsModule } from '@angular/forms';
import { Role, RolePermissions } from '../../../../models/types';
import { RolePermissionsService } from '../../services/role-permissions.service';

type RolePermissionsFormGroup = FormGroup<{
  controller_name: FormControl<string>;
  controller_action: FormControl<string>;
  add: FormControl<boolean>;
  read: FormControl<boolean>;
  edit: FormControl<boolean>;
  delete: FormControl<boolean>;
}>;

@Component({
  selector: 'app-role-permissions',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './role-permissions.component.html',
  styleUrls: ['./role-permissions.component.css'],
})
export class RolePermissionsComponent implements OnInit {
  rolePermissionsForm: FormGroup;
  addPermissionForm: FormGroup;
  roles: Role[] = [];
  isEditing: { [key: string]: boolean } = {};
  showAddForm: { [key: string]: boolean } = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private rolePermissionsService: RolePermissionsService
  ) {
    this.rolePermissionsForm = new FormGroup({
      role: new FormControl('', Validators.required),
      rolePermissions: new FormArray<RolePermissionsFormGroup>([]),
    });

    this.addPermissionForm = new FormGroup({
      controller_name: new FormControl('', Validators.required),
      controller_action: new FormControl('', Validators.required),
      add: new FormControl(false),
      read: new FormControl(false),
      edit: new FormControl(false),
      delete: new FormControl(false),
    });
  }

  ngOnInit() {
    this.roles = this.rolePermissionsService.getRoles();
    this.activatedRoute.paramMap.subscribe(params => {
      const role = params.get('role');
      if (role) {
        this.loadRoleData(role);
      }
    });
  }

  get rolePermissions() {
    return this.rolePermissionsForm.get('rolePermissions') as FormArray<RolePermissionsFormGroup>;
  }

  addRolePermission() {
    this.rolePermissions.push(
      new FormGroup({
        controller_name: new FormControl('', Validators.required),
        controller_action: new FormControl('', Validators.required),
        add: new FormControl(false),
        read: new FormControl(false),
        edit: new FormControl(false),
        delete: new FormControl(false),
      }) as RolePermissionsFormGroup
    );
  }

  removeRolePermission(index: number) {
    this.rolePermissions.removeAt(index);
  }

  submit() {
    if (this.rolePermissionsForm.valid) {
      const roleData: Role = this.rolePermissionsForm.value;
      const existingRole = this.rolePermissionsService.getRoleByName(roleData.role);

      if (existingRole) {
        this.rolePermissionsService.editRolePermissions(roleData);
      } else {
        this.rolePermissionsService.addRole(roleData);
      }

      console.log('Role Permissions Data:', roleData);
      this.roles = this.rolePermissionsService.getRoles(); // Refresh roles list
    } else {
      console.log('Form is incomplete or invalid');
    }
  }

  private loadRoleData(role: string) {
    const roleData = this.rolePermissionsService.getRoleByName(role);
    if (roleData) {
      this.rolePermissionsForm.setValue({
        role: roleData.role,
        rolePermissions: [],
      });

      const rolePermissionsArray = this.rolePermissionsForm.get('rolePermissions') as FormArray;
      roleData.rolePermissions.forEach(permission => {
        const permissionGroup = new FormGroup({
          controller_name: new FormControl(permission.controller_name, Validators.required),
          controller_action: new FormControl(permission.controller_action, Validators.required),
          add: new FormControl(permission.add),
          read: new FormControl(permission.read),
          edit: new FormControl(permission.edit),
          delete: new FormControl(permission.delete),
        });
        rolePermissionsArray.push(permissionGroup);
      });
    }
  }

  toggleEdit(roleName: string) {
    this.isEditing[roleName] = !this.isEditing[roleName];
  }

  toggleAddForm(roleName: string) {
    this.showAddForm[roleName] = !this.showAddForm[roleName];
  }

  submitAddPermission(roleName: string) {
    if (this.addPermissionForm.valid) {
      const newPermission = this.addPermissionForm.value;
      const role = this.rolePermissionsService.getRoleByName(roleName);

      if (role) {
        role.rolePermissions.push(newPermission);
        this.rolePermissionsService.editRolePermissions(role);
        this.showAddForm[roleName] = false; // Hide the add form
        this.addPermissionForm.reset();
        console.log('Added Permission:', newPermission);
      }
    }
  }

  cancelAddPermission(roleName: string) {
    this.showAddForm[roleName] = false; // Hide the add form
    this.addPermissionForm.reset();
  }
}
