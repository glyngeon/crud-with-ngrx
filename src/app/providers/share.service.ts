import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  public shareUserDetails = {
    choice: 0,
    id: 0
  }

  constructor() { }
  // share user details
  // public setUserDetails(value: any) {
  //   this.shareUserDetails.next(value);
  // }
}
