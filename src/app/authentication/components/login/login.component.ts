import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IMAGE_URLS } from 'src/app/core/constants/image-source';
import { CustomValidators } from 'src/app/core/constants/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  IMAGE_URLS = IMAGE_URLS;


  loginForm = this.fb.group({
    login_credential: ['', [CustomValidators.required, CustomValidators.email]],
    password: ['', [CustomValidators.required, CustomValidators.password]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
