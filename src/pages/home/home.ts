import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from "@ionic-native/barcode-scanner";
//import { StudentslistProvider } from './../../providers/studentslist/studentslist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  options: BarcodeScannerOptions;
  results: {};





  constructor(private barcode: BarcodeScanner, public navCtrl: NavController,) {
    //this.student = this.navParams.get('student');
    /*this.studentProvider.isScanned(this.student.).then(isScan => {
      this.isScanned = isScan;
    })*/
  }

  async scanBarcode() {


    this.results = await this.barcode.scan(this.options);
    console.log("fired from home.ts : " + this.results);


  }





}

