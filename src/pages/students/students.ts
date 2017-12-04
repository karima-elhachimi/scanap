/*import { StudentProvider } from './../../providers/favorite/favorite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-film-details',
  templateUrl: 'students.html',
})
export class StudentsPage {
  student: any;
  isScanned = false;

  constructor(public navCtrl: NavController, public studentProvider: StudentProvider, public navParams: NavParams) {
    this.student = this.navParams.get('student');
    this.studentProvider.isScanned(this.student.student_id).then(isScan => {
      this.isScanned = isScan;
    })
  }

  addScanned() {
    this.studentProvider.addScanned(this.student.student_id).then(() => {
      this.isScanned = true;
    });
  }

  removeScanned() {
    this.studentProvider.removeScanned(this.student.student_id).then(() => {
      this.isScanned = false;
    });
  }
}*/
