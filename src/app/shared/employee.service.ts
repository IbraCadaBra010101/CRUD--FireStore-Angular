import {Injectable} from '@angular/core';
import {Employee} from './employee.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;

  constructor(private firestore: AngularFirestore) {

  }
// the get employee function returns an observable.
  getEmployees() {
   return this.firestore.collection('employee').snapshotChanges();
  }
}
