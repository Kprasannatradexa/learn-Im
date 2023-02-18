import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/interceptor/auth.interceptor';
import { ServerInterceptor } from './services/interceptor/server.interceptor';
import { SharedModule } from '../shared/shared.module';
import { DragDropDirective } from './directives/drag-drop.directive';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DragDropDirective,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerInterceptor,
      multi: true
    }
  ],
  exports: [
    DragDropDirective,
    HeaderComponent

  ]
})
export class CoreModule { }
