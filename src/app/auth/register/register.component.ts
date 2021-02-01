import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {



  private emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


  public registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],

  })



  constructor(private authSvc: AuthService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }



  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email, password);
      if (user) {
        console.log("Registro Exitoso");
        this.router.navigate(['/home']);
      }
    }

    catch (error) { console.log(error) }
  }



  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }



}

