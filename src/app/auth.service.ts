import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import md5 from 'md5';  // Import md5 for Gravatar URL

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  login(email: string, password: string) {
    const auth = getAuth();  // Initialize Firebase Auth
    return signInWithEmailAndPassword(auth, email, password);  // Return the promise from this method
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return new Promise<void>((resolve, reject) => {
      const auth = getAuth();  // Initialize Firebase Auth
      
      createUserWithEmailAndPassword(auth, email, password)
        .then((response: UserCredential) => {
          // Generate Gravatar URL based on email hash
          const hash = md5(email.trim().toLowerCase());
          const avatarURL = `https://www.gravatar.com/avatar/${hash}?s=128&d=identicon`;

          // Update user profile with display name and avatar URL
          updateProfile(response.user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: avatarURL
          })
          .then(() => {
            resolve();  // Successfully updated profile, resolve the promise
          })
          .catch((error: Error) => {
            reject(error);  // Reject with profile update error
          });
        })
        .catch((error: any) => {
          if (error.code === 'auth/email-already-in-use') {
            reject(new Error('The email address is already in use. Please try another.'));
          } else {
          reject(error);
          }  // Reject with signup error
        });
    });
  }
}
