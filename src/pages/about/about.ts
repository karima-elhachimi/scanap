import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Toast } from '@ionic-native/toast';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
//import {getCurrentDebugContext} from "@angular/core/src/view/services";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  scannedStudents = [];
  constructor(public navCtrl: NavController,private sqlite: SQLite, private toast: Toast) {

    this.getCurrentData();
  }

  getCurrentData() {
    this.sqlite.create({
      name: 'scannedstudents.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM scannedstudents', {})
        .then(res => {
          if(res.rows.length > 0) {
           this.scannedStudents = res.rows;
          }
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }







}
