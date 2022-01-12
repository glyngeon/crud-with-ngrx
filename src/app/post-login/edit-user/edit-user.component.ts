import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { HttpHandlerService } from '../../providers/http-handler.service';
import { ShareService } from 'src/app/providers/share.service';
import { UserDetails } from '../../models/user.model';
import { UserList } from '../../../assets/Data/userList';
import { Store } from '@ngrx/store';
import { addUser, addUserSuccess, updateUser } from 'src/app/states/users/user.action';
import { getUserDetails } from 'src/app/states/users/user.selector';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public submitted: boolean = false;
  public errorMessage: string = '';
  private choice: number = 0;
  private index: number = 0;
  private updateUser: UserDetails = {
    id: 0,
    first_name: '',
    last_name: '',
    avatar: '',
    gender: 'male',
    email: '',
    mobile: 0,
    salary: 0
  };
  private userResponseData: any = {};
  submitButton: string = 'Add User';
  constructor(private router: Router, 
    private fb: FormBuilder, 
    private httpHandler: HttpHandlerService, 
    private shareService: ShareService, 
    private location: Location,
    private store: Store) { }

  public newUserForm = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    gender: ['Male', Validators.required],
    mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)]],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    salary: ['', Validators.required],
  });

  ngOnInit(): void {
    this.index = this.shareService.shareUserDetails.id;
    this.choice = this.shareService.shareUserDetails.choice;
    if (this.choice === 1) {
      let temp: any;
      this.store.select(getUserDetails).subscribe((data) => {
        console.log(data);
        temp = data;
      });
      this.userResponseData = temp[this.index];
      this.submitButton = 'Update User';
      this.newUserForm.controls['first_name'].setValue(temp[this.index].first_name);
      this.newUserForm.controls['last_name'].setValue(temp[this.index].last_name);
      this.newUserForm.controls['gender'].setValue(temp[this.index].gender);
      this.newUserForm.controls['mobile'].setValue(temp[this.index].mobile);
      this.newUserForm.controls['email'].setValue(temp[this.index].email);
      this.newUserForm.controls['salary'].setValue(temp[this.index].salary);
    }

    // let temp: any = this.shareService.shareUserDetails.userDetails;
    // if (this.choice === 1 ) {
    //   this.submitButton = 'Update User';
    //   this.newUserForm.controls['first_name'].setValue(temp['first_name']);
    //   this.newUserForm.controls['last_name'].setValue(temp.last_name);
    //   this.newUserForm.controls['gender'].setValue(temp.gender);
    //   this.newUserForm.controls['mobile'].setValue(temp.mobile);
    //   this.newUserForm.controls['email'].setValue(temp.email);
    //   this.newUserForm.controls['salary'].setValue(temp.salary);
    // }
  }

  /**
   * The above code is creating a function that returns the form controls.
   */
  get f() {
    return this.newUserForm.controls;
  }

  public onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.newUserForm.invalid) {
      return;
    } else {
      this.updateUser.first_name = this.newUserForm.controls.first_name.value;
      this.updateUser.last_name = this.newUserForm.controls.last_name.value;
      this.updateUser.gender = this.newUserForm.controls.gender.value;
      this.updateUser.mobile = this.newUserForm.controls.mobile.value;
      this.updateUser.email = this.newUserForm.controls.email.value;
      this.updateUser.salary = this.newUserForm.controls.salary.value;

      // for store data in dummy user list ( temp purpose)
      if (this.choice === 1) {                  // update user
        this.updateUser.id = this.userResponseData.id;
        this.router.navigate(['users']);
        this.store.dispatch(updateUser({userData: this.updateUser}));
      } else if (this.choice !== 1) {           // add new user
        this.updateUser.id = 0;
        this.store.dispatch(addUser({userData: this.updateUser}));
        this.router.navigate(['users']);
      }
    }
  }

  /**
   * `back()`: Navigate back to the previous page.
   * @returns None
   */
  public back() {
    this.location.back();
  }
}
