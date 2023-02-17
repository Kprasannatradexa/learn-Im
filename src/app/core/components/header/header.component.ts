import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild('header') header!: ElementRef;

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

  constructor(private router: Router) { }

  navigateToSignIn() {
    this.router.navigate(['/auth/login'])
  }

}
