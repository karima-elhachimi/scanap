import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
import { StudentProvider } from './../../providers/favorite/favorite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};
  student: any;
  isScanned = false;

  constructor(private barcode: BarcodeScanner, public navCtrl: NavController, public studentProvider: StudentProvider, public navParams: NavParams) {
    this.student = this.navParams.get('student');
    this.studentProvider.isScanned(this.student.student_id).then(isScan => {
      this.isScanned = isScan;
    })
  }

  async scanBarcode() {

    this.options = {
      prompt: 'Scan a barcode to see the student information.'
    };

    this.results = await this.barcode.scan(this.options);
    console.log("fired from home.ts : " + this.results);

    this.student = this.results;
    this.student.addScanned();
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


}

