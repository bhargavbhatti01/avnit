import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { getAuth, User } from 'firebase/auth';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;  // Post data from parent
  @Output() onDelete = new EventEmitter<void>();  // Notify parent component
  user: User | null = null;

  ngOnInit(): void {
    this.user = getAuth().currentUser; 
     // Get current authenticated user
     console.log("Post received in PostComponent:", this.post);
     // Convert Firestore Timestamp to JavaScript Date
  if (this.post.created && this.post.created.toDate) {
    this.post.created = this.post.created.toDate(); 
    
  }
  // Debug the owner field
  if (!this.post.owner) {
    console.error("Owner field is missing or null in post:", this.post);
  }
  }

  async delete() {
    const firestore = getFirestore();
    const postRef = doc(firestore, 'post', this.post.id);  // Reference to post
    try {
      await deleteDoc(postRef);  // Delete post from Firestore
      this.onDelete.emit();  // Notify parent to refresh posts
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }
}
