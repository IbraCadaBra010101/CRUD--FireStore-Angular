import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../shared/employee.service';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private fireStore: AngularFirestore,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.resetForm();


  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }

    this.service.formData = {
      id: null,
      fullName: '',
      empCode: '',
      position: '',
      mobile: '',

    };
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.fireStore.collection('employee').add(data);
    } else {
      this.fireStore.doc('employee/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success('Submitted employee details successfully', 'Employee registration');
  }

}

