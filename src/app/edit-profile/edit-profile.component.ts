import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../../firebase.config';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {}; // Store user data for the form
  userId: string = ''; // To store the user ID from the route
  message: string = ''; // For success/failure messages

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the userId from the route
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.loadUserData();
  }

  // Fetch user data from Firestore and populate the form
  async loadUserData() {
    try {
      const userRef = doc(firestore, 'users', this.userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        this.user = userDoc.data();
        // Split displayName into firstName and lastName if displayName exists
        const fullName = this.user.displayName || '';
        const [firstName, lastName] = fullName.split(' '); // Split by space
        this.user.firstName = firstName || ''; // Set default values if empty
        this.user.lastName = lastName || ''; // Set default values if empty
      } else {
        console.error('No such user!');
        this.message = 'User data not found.';
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.message = 'An error occurred while loading your profile.';
    }
  }

  // Update user profile in Firebase and Firestore
  async update() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.uid === this.userId) {
      try {
        // Ensure firstName and lastName are handled properly
        const firstName = this.user.firstName.trim() || 'Default first name';
        const lastName = this.user.lastName.trim() || 'Default last name';
  
        // Update Firebase Auth profile (e.g., name, photo)
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`, // Use trimmed names
          photoURL: this.user.photoURL || '' // Handle missing photoURL
        });
  
        // Update Firestore user document
        await setDoc(doc(firestore, 'users', this.userId), {
          firstName: firstName,
          lastName: lastName,
          email: this.user.email,
          bio: this.user.bio,
          interests: this.user.interests,
          hobbies: this.user.hobbies,
          photoURL: this.user.photoURL || '' // Handle missing photoURL
        });
  
        this.message = 'Profile updated successfully!';
      } catch (error) {
        console.error('Error updating profile:', error);
        this.message = 'An error occurred while updating your profile.';
      }
    } else {
      console.error('User not authenticated or incorrect user ID.');
      this.message = 'User authentication failed.';
    }
  }
}
