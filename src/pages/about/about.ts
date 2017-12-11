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

    this.createData();
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

createData(){
  this.scannedstudents.create({
    number: 1,
    name: 'wes',
    firstname: 'Cal',
    snr: '97820044',
    location: 'default'

  }).then((db: SQLiteObject)=> {
    db.executeSql('INSERT INTO scannedstudents VALUES(NULL,?,?,?)',[ new Date(), this.naam,this.firstname, this.snr])
    .then(res => {
      console.log(res);
      this.toast.show('Data saved', '5000', 'center').subscribe(
        toast => {
          this.navCtrl.popToRoot();
        }
      );
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
