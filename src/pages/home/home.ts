import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
//import { StudentslistProvider } from './../../providers/studentslist/studentslist';

import { Toast } from '@ionic-native/toast';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
//csv reader


import * as papa from 'papaparse';

//import { AboutPage } from '../about/about';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  csvData: any[] = [];
  headerRow: any[] = [];
  options: BarcodeScannerOptions;
  results: {};

  scannedStudents: any = [];
  scannedStudent = { date:"", naam:"", snr: 0};
  name: string;





  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, private http: Http, private sqlite: SQLite, private toast: Toast) {
    //this.student = this.navParams.get('student');
    /*this.studentProvider.isScanned(this.student.).then(isScan => {
      this.isScanned = isScan;
    })*/

    this.readCsvData();
    this.getData();

  }


  async scanBarcode() {


    this.results = await this.barcode.scan(this.options);
    console.log("fired from home.ts : " + this.results);


      //this.getStudentNaam( await this.results);

  }

  //reading csv data to db

  private readCsvData() {
    this.http.get('assets/data/studenten.csv')
      .subscribe(
        data => this.extractData(data),
        err => this.handleError(err)
      );
  }

  private extractData(res) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData).data;

    this.headerRow = parsedData[0];

    parsedData.splice(0, 1);
    this.csvData = parsedData;
  }

  downloadCSV() {
    let csv = papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });

    // Dummy implementation for Desktop download purpose
    var blob = new Blob([csv]);
    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = "newdata.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private handleError(err) {
    console.log('something went wrong: ', err);
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  //create databases

  getData() {
    this.sqlite.create({
      name: 'scannedstudents.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('CREATE TABLE IF NOT EXISTS scannedstudents (rowid INTEGER PRIMARY KEY, date TEXT, name TEXT, snr INTEGER)', {})
        .then(res => console.log('Executed SQL'))
        .catch(e => console.log(e));
      db.executeSql('SELECT * FROM scannedstudents ORDER BY rowid DESC', {})
        .then(res => {
          this.scannedStudents = [];
          for(var i=0; i<res.rows.length; i++) {
            this.scannedStudents.push({rowid:res.rows.item(i).rowid,date:res.rows.item(i).date,name:res.rows.item(i).name})
          }
        })
        .catch(e => console.log(e));
      /*
      db.executeSql('SELECT SUM(amount) AS totalIncome FROM expense WHERE type="Income"', {})
        .then(res => {
          if(res.rows.length>0) {
            this.totalIncome = parseInt(res.rows.item(0).totalIncome);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })
        .catch(e => console.log(e));
      db.executeSql('SELECT SUM(amount) AS totalExpense FROM expense WHERE type="Expense"', {})
        .then(res => {
          if(res.rows.length>0) {
            this.totalExpense = parseInt(res.rows.item(0).totalExpense);
            this.balance = this.totalIncome-this.totalExpense;
          }
        })*/
    }).catch(e => console.log(e));

  }

  createStudentToSave(){
    this.sqlite.create({
      name: 'scannedstudents.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO scannedstudents VALUES(NULL,?,?,?)',[ new Date(), 'Cal','Wes', 097820044])
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


  saveData() {
    this.sqlite.create({
      name: 'scannedstudents.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO scannedstudents VALUES(NULL,?,?,?)',[ new Date(), this.scannedStudent.naam, this.scannedStudent.snr])
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

  getStudentNaam(result){

    let snr = result.text.slice(1, result.length);
    for(let i = 0; this.csvData.length; i++){

      let arrayStudent = this.csvData[i].split(',');
      console.log(`array student snr: ${arrayStudent[1]} snr: ${snr} `);

      //if(arrayStudent[1] === snr)

    }
  }





}
