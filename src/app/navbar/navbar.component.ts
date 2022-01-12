import { Component, OnInit, HostListener, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserServiceService } from '../providers/user-service.service';
import { signinOut } from '../states/auth/auth.actions';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    @ViewChild('navbarWrapper', { read: ElementRef })
    navbarWrapper!: ElementRef<any>;

    public menuToggleHtml!: HTMLElement;
    public toggleFlag: boolean = false;
    public currentUrl: any;
    constructor(private renderer: Renderer2, 
        private router: Router, 
        private userService: UserServiceService,
        private store: Store) {}

    ngOnInit(): void {
        this.toggleFlag = false;
        this.currentUrl = this.router.url === '/login';
    }

    ngAfterInit() {
        this.menuToggleHtml = this.navbarWrapper.nativeElement.querySelector('.menu-toggle');
    }

    @HostListener('window: resize') resize() {
        if (window.innerWidth > 800) {
            this.toggleFlag = false;
            this.renderer.addClass(this.navbarWrapper.nativeElement.querySelector('.menu-toggle'), 'change');
            this.renderer.removeClass(this.navbarWrapper.nativeElement.querySelector('.menu-toggle'), 'change');
        }
    }
    menuToggle() {
        this.toggleFlag = !this.toggleFlag;
        if (this.toggleFlag) {
            this.renderer.addClass(this.navbarWrapper.nativeElement.querySelector('.menu-toggle'), 'change');
        } else {
            this.renderer.removeClass(this.navbarWrapper.nativeElement.querySelector('.menu-toggle'), 'change');
        }
    }

    public logout() {
        this.store.dispatch(signinOut());
        // this.userService.userlogout();
        // this.router.navigate(['login']);
    }
}
