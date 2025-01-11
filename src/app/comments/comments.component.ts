import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, query, where, orderBy, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase.config';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, OnChanges {
  comment: string = '';
  comments: any[] = [];
  loggedIn: boolean = false;
  @Input('postId') postId: string = '';

  constructor() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.loggedIn = !!user;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && changes['postId'].currentValue) {
      console.log('postId changed:', changes['postId'].currentValue);
      this.postId = changes['postId'].currentValue;
      this.getComments();
    } else {
      console.warn('postId did not change or is undefined');
    }
  }

  ngOnInit(): void {
    console.log('ngOnInit called with postId:', this.postId);
    // Check postId after a slight delay to ensure it is set
    setTimeout(() => {
      if (this.postId) {
        console.log('postId confirmed after timeout:', this.postId);
        this.getComments();
      } else {
        console.error('postId is still undefined after timeout');
      }
    }, 100); // 100 milliseconds delay
  }

  async postCmt(): Promise<void> {
    if (this.comment.length < 3) {
      console.warn('Comment is too short');
      return;
    }

    if (!this.postId) {
      console.error('postId is undefined when trying to post a comment');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await addDoc(collection(firestore, 'comments'), {
          text: this.comment,
          post: this.postId,
          owner: user.uid,
          ownername: user.displayName || 'Anonymous',
          created: serverTimestamp()
        });
        console.log('Comment posted successfully');
        this.comment = ''; // Clear the textarea after posting
        this.getComments(); // Reload comments after posting
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    } else {
      console.warn('User is not authenticated');
    }
  }

  async getComments(): Promise<void> {
    this.comments = [];
    if (!this.postId) {
      console.error('postId is undefined when trying to fetch comments');
      return;
    }

    try {
      const q = query(
        collection(firestore, 'comments'),
        where('post', '==', this.postId),
        orderBy('created', 'desc')
      );
      console.log('Querying comments for postId:', this.postId); // Log the query attempt
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log('Comment data:', doc.data()); // Log each comment data
        this.comments.push(doc.data());
      });
      console.log('Fetched comments:', this.comments);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }
}
