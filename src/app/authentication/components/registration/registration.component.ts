import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/core/constants/validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.fb.group({
    user_name: ['', [CustomValidators.required]],
    email: ['', [CustomValidators.required, CustomValidators.email]],
    password: ['', [CustomValidators.required, CustomValidators.password]],
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
