// src/app/create/create.component.ts
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxEditorModule, Editor } from 'ngx-editor';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { firestore } from '../../firebase.config';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, NgxEditorModule],
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  title: string = '';
  content: string = '';
  editor!: Editor;

  @Output() postCreated = new EventEmitter<void>(); // Notify parent component on post creation

  constructor() {}

  ngOnInit() {
    this.editor = new Editor();
  }

  async createPost() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(firestore, "post"), {
          title: this.title,
          content: this.content,
          owner: user.uid,
          created: serverTimestamp()
        });
        console.log("Post created successfully");
        this.postCreated.emit(); // Notify parent to refresh posts
      } catch (error) {
        console.error("Error adding post:", error);
      }
    } else {
      console.log("User is not authenticated");
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
