/*import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase.config';
import { PostComponent } from '../post/post.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  post: any[] = [];
  message: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getProfile(id);  // Fetch profile data
      this.getUserPost(id);  // Fetch user's posts
    }
  }

  async getProfile(id: string): Promise<void> {
    try {
      const userRef = doc(firestore, 'users', id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        this.user = userDoc.data();
        this.user.id = userDoc.id;
        this.user.displayName = `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
        if (this.user.hobbies && typeof this.user.hobbies === 'string') {
          this.user.hobbies = this.user.hobbies.split(',');
        }
      } else {
        console.error('No such user!');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  }

  async getUserPost(id: string): Promise<void> {
    try {
      const postRef = collection(firestore, 'post');
      const q = query(postRef, where('owner', '==', id));
      const querySnapshot = await getDocs(q);
      this.post = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error('Error fetching posts:', error);
      console.log("Fetched posts:", this.post);

    }
  }

  async updateProfileData() {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        // Validate required fields before updating
        if (!this.user.firstName || !this.user.lastName) {
          throw new Error("First name and last name are required.");
        }
  
        // Update Firebase Auth profile
        await updateProfile(user, {
          displayName: `${this.user.firstName} ${this.user.lastName}`,
          photoURL: this.user.photoURL || '' // Ensure photoURL is not undefined
        });
  
        // Update Firestore user document
        const userRef = doc(firestore, 'users', this.user.id);
        await setDoc(userRef, {
          firstName: this.user.firstName,
          lastName: this.user.lastName,
          email: this.user.email || '',
          bio: this.user.bio || '',
          interests: this.user.interests || '',
          hobbies: this.user.hobbies || '',
          photoURL: this.user.photoURL || '',
          updatedAt: new Date()
        });
  
        this.message = 'Profile updated successfully!';
      } catch (error: unknown) {
        // Handle error gracefully
        if (error instanceof Error) {
          console.error('Error updating profile:', error.message);
          this.message = `Error updating profile: ${error.message}`;
        } else {
          console.error('An unknown error occurred:', error);
          this.message = 'An unknown error occurred while updating your profile.';
        }
      }
    } else {
      console.error('User not authenticated.');
      this.message = 'User authentication failed.';
    }
  }
  }*/

  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
  import { firestore } from '../../firebase.config';
  import { PostComponent } from '../post/post.component';
  import { CommonModule } from '@angular/common';
  import { RouterModule } from '@angular/router';

  @Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule, PostComponent],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
  })
  export class ProfileComponent implements OnInit {
    user: any = {};
    post: any[] = [];
    message: string = "";
  
    constructor(private route: ActivatedRoute) {}
  
    ngOnInit(): void {
      // Watch for changes in the route parameter and re-fetch data
      this.route.paramMap.subscribe((params) => {
        const id = params.get('id');
        if (id) {
          this.getProfile(id); // Fetch profile data
          this.getUserPosts(id); // Fetch user posts
        }
      });
    }
  
    async getProfile(id: string): Promise<void> {
      try {
        const userRef = doc(firestore, 'users', id);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          this.user = userDoc.data();
          this.user.id = userDoc.id;
          this.user.displayName = `${this.user.firstName || ''} ${this.user.lastName || ''}`.trim();
          if (this.user.hobbies && typeof this.user.hobbies === 'string') {
            this.user.hobbies = this.user.hobbies.split(',');
          }
        } else {
          console.error('No such user!');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
  
    async getUserPosts(id: string): Promise<void> {
      try {
        const postRef = collection(firestore, 'post');
        const q = query(postRef, where('owner', '==', id));
        const querySnapshot = await getDocs(q);
        this.post = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
  }
  

