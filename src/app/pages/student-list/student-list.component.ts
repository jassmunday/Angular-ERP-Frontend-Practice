import { Component, OnInit } from '@angular/core';
import { Student } from '../../../../models/types';
import { Router } from '@angular/router';
import { DetailFormService } from '../../services/detail-form.service';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit {

  students: Student[] = [];

  constructor(
    private studentService: DetailFormService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAllStudents().subscribe((students) => {
        console.log(students);
        this.students = students;
      });
  }

  editStudent(_id: string | undefined) {
    if (_id) {
      this.router.navigate(['detail-form', _id]);
    } else {
      console.error('Invalid student ID');
    }
  }

  addStudent() {
    this.router.navigate(['detail-form']);
  }

  deleteStudent(_id: string | undefined) {
    if (_id) {
      this.studentService.deleteStudent(_id);
    } else {
      console.error('Invalid student ID');
    }
  }
}
