import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class Tab1Page {

  currentView = 'welcome';

  posts: any[] = [];
  loading = false;
  error = '';

  constructor(private postService: PostService) {}

  showWelcome() {
    this.currentView = 'welcome';
  }

  showPosts() {
    this.currentView = 'posts';
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.error = '';

    this.postService.getPosts().subscribe({
      next: (data: any[]) => {
        this.posts = data.slice(0, 10);
        this.loading = false;
      },
      error: () => {
        this.error = 'Erreur chargement API';
        this.loading = false;
      }
    });
  }

  deletePost(id: number) {
    this.posts = this.posts.filter(p => p.id !== id);
  }

  editPost(post: any) {
    const t = prompt('Titre:', post.title);
    const b = prompt('Contenu:', post.body);

    if (t && b) {
      post.title = t;
      post.body = b;
    }
  }
}