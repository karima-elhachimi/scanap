import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
//import { StudentslistProvider } from './../../providers/studentslist/studentslist';

import { Http } from '@angular/http';
//csv reader
import * as papa from 'papaparse';

import { SQLite } from 'cordova-sqlite-storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  csvData: any[] = [];
  headerRow: any[] = [];
  options: BarcodeScannerOptions;
  results: {};





  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, private http: Http) {
    //this.student = this.navParams.get('student');
    /*this.studentProvider.isScanned(this.student.).then(isScan => {
      this.isScanned = isScan;
    })*/

    this.readCsvData();
  }


  async scanBarcode() {


    this.results = await this.barcode.scan(this.options);
    console.log("fired from home.ts : " + this.results);


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






}

