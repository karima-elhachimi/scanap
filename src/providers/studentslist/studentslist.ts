//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 /*
  Generated class for the StudentslistProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const STORAGE_KEY = 'scannedStudents';

@Injectable()
export class StudentslistProvider {

  constructor(public storage: Storage) {
    console.log('Hello StudentslistProvider Provider');


  }


  addScannedStudent(studentNummer) {
    console.log("addscannedSTudent fired!");

    this.storage.set(STORAGE_KEY, studentNummer);


  }


  getAllScannedStudents() {
    return this.storage.get(STORAGE_KEY);
  }

}
