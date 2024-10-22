import { Component, OnInit } from '@angular/core'; 
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { initializeApp } from 'firebase/app';  // Import initializeApp from firebase/app
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import md5 from 'md5'; // You need the md5 for Gravatar hash
import { AuthService } from '../auth.service';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyANwwbu0Q6HJ3CscUZV9qyvlcj4rvRx6EU",
  authDomain: "avnit-f05d4.firebaseapp.com",
  projectId: "avnit-f05d4",
  storageBucket: "avnit-f05d4.appspot.com",
  messagingSenderId: "495903492831",
  appId: "1:495903492831:web:7fb0ce0e49a5900f36376a",
  measurementId: "G-CR2PGKFF9F"
};

// Initialize Firebase app (this must be called before any Firebase service is used)
const app = initializeApp(firebaseConfig);

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string = ""
  userError: any;

  constructor(private fb: FormBuilder, public authservice: AuthService) {
    this.myForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkIfMatchingPasswords });
  }

  checkIfMatchingPasswords(group: FormGroup) {
    const password = group.controls['password'];
    const confirmPassword = group.controls['confirmPassword'];

    if (password.value === confirmPassword.value) {
      return null;
    } else {
      confirmPassword.setErrors({ notEqualToPassword: true });
      return { notEqualToPassword: true };
    }
  }

  onSubmit(Form: FormGroup) { 
    let email: string = this.myForm.value.email;
    let password: string = this.myForm.value.password;
    let firstName: string = this.myForm.value.firstName;
    let lastName: string = this.myForm.value.lastName;

    // Get the Firebase Auth service (now that the app is initialized)
    const auth = getAuth(app);
    
    this.authservice.signup(email, password, firstName,lastName).then(() => {
            
              this.message = 'You have been signed up successfully. Please login.'

            }).catch((error) => {
              console.log(error);
              this.userError = error;
            });
         }

  ngOnInit() { }
}
