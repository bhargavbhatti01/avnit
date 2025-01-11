import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import {doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../firebase.config';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { CommentsComponent } from '../comments/comments.component';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule,CommentsComponent],
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  post: any = null; // Initialize as null for loading
  postId!: string;

  constructor(private route: ActivatedRoute, private zone: NgZone) {}

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User is authenticated:', user);
        const postId = this.route.snapshot.paramMap.get('postId');
        if (postId) {
          console.log(`postId from route: ${postId}`); // Log postId
          this.postId = postId;
          this.getPostData(this.postId);
        } else {
          console.error('No postId found in route parameters.');
        }
      } else {
        console.error('User is not authenticated.');
      }
    });
  }

  async getPostData(postId: string): Promise<void> {
    try {
      const docRef = doc(firestore, 'post', postId); // Correct collection name 'post'
      console.log(`Fetching document for postId: ${postId}`); // Log fetch attempt
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()); // Log document data
        this.zone.run(() => {
          this.post = docSnap.data();
        });
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  }
}
