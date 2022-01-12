import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { HttpHandlerService } from '../providers/http-handler.service';
import { UserServiceService } from '../providers/user-service.service';
import { Store } from '@ngrx/store';
import { signinStart } from '../states/auth/auth.actions';
import { getToken } from '../states/auth/auth.selector';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
    public submitted: boolean = false;

    constructor(private router: Router, private fb: FormBuilder, private httpHandler: HttpHandlerService, 
        private userService: UserServiceService, private store: Store) { }

    public signinForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
    });

    ngOnInit(): void {
        this.submitted = false;
    }

    get f() {
        return this.signinForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        // email = 'eve.holt@reqres.in'
        // password = 'cityslicka'
        if (this.signinForm.invalid) {
            return;
        } else {
            this.store.dispatch(signinStart(this.signinForm.value));
            // this.store.select(getToken);
            console.log(this.store.select(getToken));
            // this.httpHandler.loginCall(this.signinForm.value).subscribe(
            //     (response: any) => {
            //         this.userService.setUser(response.token);
            //         this.router.navigate(['users']);
            //         this.submitted = false;
            //         this.signinForm.patchValue({
            //             email: null,
            //             password: null,
            //         });
            //     },
            //     (error) => {
            //         console.log(error);
            //     }
            // );

        }
    }
}
