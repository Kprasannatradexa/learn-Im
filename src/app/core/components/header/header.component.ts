import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, shareReplay } from 'rxjs';
import { UserSession } from '../../models/user.model';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild('header') header!: ElementRef;

  user$!: Observable<UserSession | null>;

  isScrolled: boolean = false


  @HostListener('window:scroll', ['$event']) // for window scroll events

  onScroll() {
    const currentScrollPosition = window.pageYOffset;
    const offsetHeight = this.header.nativeElement.offsetHeight;
    if (currentScrollPosition > offsetHeight / 1.5) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  constructor(private router: Router,
    private userService: UserService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.user$ = this.userService.user$;
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/login'])
  }

}
