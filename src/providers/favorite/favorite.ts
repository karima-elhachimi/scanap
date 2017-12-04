import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'students';

@Injectable()
export class StudentProvider {

  constructor(public storage: Storage) { }

  isScanned(gescandeNummer) {
    return this.getAllScanned().then(result => {
      return result && result.indexOf(gescandeNummer) !== -1;
    });
  }

  addScanned(gescandeNummer) {
    return this.getAllScanned().then(result => {
      if (result) {
        result.push(gescandeNummer);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [gescandeNummer]);
      }
    });
  }

  removeScanned(gescandeNummer) {
    return this.getAllScanned().then(result => {
      if (result) {
        var index = result.indexOf(gescandeNummer);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllScanned() {
    return this.storage.get(STORAGE_KEY);
  }

}
