import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const STORAGE_KEY = 'students';

@Injectable()
export class StudentProvider {

  constructor(public storage: Storage) { }

  isScanned(studentId) {
    return this.getAllScanned().then(result => {
      return result && result.indexOf(studentId) !== -1;
    });
  }

  addScanned(studentId) {
    return this.getAllScanned().then(result => {
      if (result) {
        result.push(studentId);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [studentId]);
      }
    });
  }

  removeScanned(studentId) {
    return this.getAllScanned().then(result => {
      if (result) {
        var index = result.indexOf(studentId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_KEY, result);
      }
    });
  }

  getAllScanned() {
    return this.storage.get(STORAGE_KEY);
  }

}
