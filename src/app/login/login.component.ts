import { Component, OnInit } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { getAuth, UserCredential } from 'firebase/auth';
import{Router,RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  myForm: FormGroup;
  message: string = "";
  userError: any;

  constructor(public fb: FormBuilder, public authService: AuthService, public router:Router) {
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

    this.router.navigate(['/myblogs'])
    })
    .catch ((error: Error) => {
      console.log(error);
      this.userError=error.message;
    });
    
    
  }
}

