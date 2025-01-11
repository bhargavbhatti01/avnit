import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { RouterLink,RouterModule } from '@angular/router';
import { CreateComponent } from '../create/create.component';
import { PostComponent } from '../post/post.component';
import { firestore } from '../../firebase.config';

@Component({
  selector: 'app-myblog',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateComponent, PostComponent,RouterModule],
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
  user: User | null = null;
  post: any[] = [];

  constructor() {}

  ngOnInit() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.getPost();
      }
    });
  }

  async getPost() {
    try {
      const postCollection = collection(firestore, 'post');
      const postQuery = query(postCollection, orderBy('created', 'desc'));
      const querySnapshot = await getDocs(postQuery);
  
      this.post = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data['title'] || 'Untitled',  // Using bracket notation here
          content: data['content'] || 'No content available',
          owner: data['owner'] || 'Unknown owner',
          created: data['created']?.toDate() || new Date()  // Firestore timestamp conversion
        };
      });
  
      console.log('Fetched posts:', this.post);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }

  onPostCreated() {
    this.getPost();
  }

  onDelete() {
    this.getPost();
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = 'https://via.placeholder.com/128';
  }
}
