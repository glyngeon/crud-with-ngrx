import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ShareService } from 'src/app/providers/share.service';
import { deleteUser, getUserStart } from 'src/app/states/users/user.action';
import { getUserDetails } from 'src/app/states/users/user.selector';
import { UserList } from '../../../assets/Data/userList';
import { UserDetails } from '../../modals/interfaces';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    // public usersResponse: UserDetails[] = [];
    // public showActionFlag: boolean = false;

    userResponse$: any;

    constructor(private router: Router,
        private shareService: ShareService,
        private store: Store) { }

    ngOnInit(): void {
        this.userList();
    }

    // show user list
    public userList() {
        this.store.dispatch(getUserStart());
        this.userResponse$ = this.store.select(getUserDetails);
        console.log(this.userResponse$);
        // this.usersResponse = UserList;
    }

    // edit user function
    public editUser(index: number) {
        // const tempUserDetails: UserDetails = {
        //     id: this.usersResponse[index].id,
        //     firstName: this.usersResponse[index].firstName,
        //     lastName: this.usersResponse[index].lastName,
        //     gender: this.usersResponse[index].gender,
        //     mobile: this.usersResponse[index].mobile,
        //     email: this.usersResponse[index].email,
        //     salary: this.usersResponse[index].salary
        // };
        // console.log('temp user details = ', tempUserDetails);
        this.shareService.shareUserDetails = {choice: 1, id: index };
        this.router.navigate(['updateUser']);
    }
    // delete user
    public deleteUser(item: any) {
        this.store.dispatch(deleteUser({id: item.id}));
        // this.usersResponse.splice(index, 1);
    }
    // add new user
    public addUser() {
        this.shareService.shareUserDetails = { choice: 2, id: 0 };
        this.router.navigate(['updateUser']);
    }
}
