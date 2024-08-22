import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student, Marks } from '../../../../models/types';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DetailFormService } from '../../services/detail-form.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

type StudentMarksFormGroup = FormGroup<{
  subject: FormControl<string>;
  marks: FormControl<number>;
}>;

@Component({
  selector: 'app-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detail-form.component.html',
  styleUrls: ['./detail-form.component.css'],
})
export class DetailFormComponent implements OnInit {
  
  students: Student[] = [];
  student: Student | null = null;
  studentForm: FormGroup;
  isEditMode: boolean = false;
  updatingStudentId: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: DetailFormService
  ) {
    this.studentForm = new FormGroup({
      name: new FormControl('', Validators.required),
      roll_no: new FormControl('', Validators.required),
      branch: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      marks: new FormArray<StudentMarksFormGroup>([]),
    });
  }

  ngOnInit() {
    this.loadAllStudents();

    this.activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('_id');
      
      if (id) {
        this.loadStudent(id);
        this.isEditMode = true;
        this.updatingStudentId = id;
      }
    });
  }

  loadAllStudents() {
    this.studentService.getAllStudents().subscribe((data) => {
      this.students = data;
      console.log(data);
    });
  }

  get marks() {
    return this.studentForm.get('marks') as FormArray<StudentMarksFormGroup>;
  }

  addStudentMarks() {
    this.marks.push(
      new FormGroup({
        subject: new FormControl('', Validators.required),
        marks: new FormControl(0, Validators.required),
      }) as StudentMarksFormGroup
    );
  }

  removeMarks(index: number) {
    this.marks.removeAt(index);
  }

  onSubmit() {
    if (this.studentForm.valid) {
      if (!this.isEditMode) {
        this.studentService.createStudent(this.studentForm.value).subscribe(() => {
          this.loadAllStudents();
          console.log('Student data added', this.studentForm.value);
          this.router.navigate(['student-list']);
        });
      } else {
        this.studentService.updateStudent(this.updatingStudentId, this.studentForm.value).subscribe(() => {
          this.loadAllStudents();
          console.log('Student Edited');
          this.isEditMode = false;
          this.updatingStudentId = '';
          this.router.navigate(['student-list']);
        });
      }
      this.studentForm.reset();
      this.marks.clear(); // Clear marks after form reset
    } else {
      console.log('Invalid Student Data');
    }
  }

  cancel() {
    this.studentForm.reset();
    this.marks.clear(); // Clear marks after form reset
    this.isEditMode = false;
    this.updatingStudentId = '';
  }

  loadStudent(id: string) {
    
    this.studentService.getStudentById(id).subscribe((student) => {
      this.student = student;
      console.log(this.student); // {} object

      if (this.student) {
        const marks = this.studentForm.get('marks') as FormArray;
        marks.clear();

        this.student.marks.forEach((value) => {
          const subjectGroup = new FormGroup({
            subject: new FormControl(value.subject, Validators.required),
            marks: new FormControl(value.marks, Validators.required),
          }) as StudentMarksFormGroup;

          marks.push(subjectGroup);
        });

        this.studentForm.patchValue({
          name: this.student.name,
          roll_no: this.student.roll_no,
          branch: this.student.branch,
          year: this.student.year,
        });
      }
    });
  }

  editStudent(id: string) {
    this.loadStudent(id);
    this.isEditMode = true;
    this.updatingStudentId = id;
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(() => {
      this.loadAllStudents();
    });
  }
}
