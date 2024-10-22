import { Component, OnInit } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { getAuth, UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  myForm: FormGroup;
  message: string = "";
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService) {
    this.myForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() { }
  
  onSubmit(form: FormGroup) {
    this.authService.login(form.value.email, form.value.password)
   .then((data: UserCredential) => {
    console.log(data);
    this.message = " You have been logged in successfully."
    })
    .catch ((error: Error) => {
      console.log(error);
      this.userError=error.message;
    });
    
    
  }
}

