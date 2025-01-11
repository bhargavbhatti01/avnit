import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string = "";
  userError: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.myForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.checkIfMatching("password", "confirmPassword")
    });
  }

  ngOnInit(): void {}

  checkIfMatching(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ notEqualToPassword: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.myForm.invalid) {
      return;
    }

    const { email, password, firstName, lastName } = this.myForm.value;

    this.authService.signup(email, password, firstName, lastName)
      .then(() => {
        this.message = "Signup successful! Redirecting...";
        this.router.navigate(['/myblogs']);
      })
      .catch((error) => {
        console.error("Signup error:", error); // Log the error
      this.userError = error.message || "An unknown error occurred.";
    });
  }
}
