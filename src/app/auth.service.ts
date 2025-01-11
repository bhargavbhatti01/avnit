import { Injectable } from '@angular/core';
import { auth, firestore } from '../firebase.config';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, UserCredential } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  signup(email: string, password: string, firstName: string, lastName: string): Promise<UserCredential> {
    return new Promise<UserCredential>((resolve, reject) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response: UserCredential) => {
          const userId = response.user.uid;
          const avatarURL = `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${userId}&radius=20&scale=100`;

          updateProfile(response.user, {
            displayName: `${firstName} ${lastName}`,
            photoURL: avatarURL
          })
          .then(() => {
            setDoc(doc(firestore, 'users', userId), {
              firstName,
              lastName,
              email,
              photoURL: avatarURL,
              interests: "",
              bio: "",
              hobbies: "",
              createdAt: new Date()
            })
            .then(() => console.log("User data saved successfully"))
            .then(() => resolve(response)) // Resolve with the correct type
            .catch((error) => reject(`Error saving user data: ${error}`));
          })
          .catch((error) => reject(`Error updating profile: ${error}`));
        })
        .catch((error) => reject(`Signup error: ${error.message}`));
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
}
