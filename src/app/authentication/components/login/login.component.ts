import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/core/constants/validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    login_credential: ['', [CustomValidators.required, CustomValidators.required]],
    password: ['', [CustomValidators.required]]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
