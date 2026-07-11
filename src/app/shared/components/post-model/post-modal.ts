import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../../core/services/post.service';
import { PublicacionDtoRequest } from '../../../core/models/post/PublicacionDtoRequest';

interface ImagePreview {
  file: File;
  url: string;
}

@Component({
  selector: 'app-post-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-modal.html',
  styleUrl: './post-modal.css',
})
export class PostModalComponent {
  isOpen = signal(false);
  postTitle = signal('');
  selectedImages = signal<ImagePreview[]>([]);
  postService = inject(PostService);

  fileInput: HTMLInputElement | null = null;

  constructor() {
    this.fileInput = document.createElement('input');
    this.fileInput.type = 'file';
    this.fileInput.multiple = true;
    this.fileInput.accept = 'image/*';
    this.fileInput.addEventListener('change', (e) => this.onImageSelect(e));
  }

  openModal(): void {
    this.isOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isOpen.set(false);
    document.body.style.overflow = 'auto';
    this.resetForm();
  }

  onImageSelect(event: Event): void {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (!files) return;

    const newImages: ImagePreview[] = [];
    let loadedCount = 0;
    const validFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          newImages.push({
            file,
            url: e.target.result as string,
          });
          loadedCount++;

          if (loadedCount === validFiles.length) {
            this.selectedImages.update((current) => [...current, ...newImages]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    this.selectedImages.update((current) => current.filter((_, i) => i !== index));
  }

  triggerFileInput(): void {
    this.fileInput?.click();
  }
  
  getGridClass(): string {
    const count = this.selectedImages().length;
    if (count === 1) return 'grid-single';
    if (count === 2) return 'grid-two';
    if (count === 3) return 'grid-three';
    if (count === 4) return 'grid-four';
    return 'grid-many';
  }

  submitPost(): void {
    if (!this.isFormValid()) return;

    const publicacion: PublicacionDtoRequest = {
      contenido: this.postTitle(),
    };

    const imagenes = this.selectedImages().map((img) => img.file);

    this.postService.newPost(publicacion, imagenes).subscribe({
      next: (response) => {
        console.log('Publicación enviada exitosamente:', response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al enviar la publicación:', error);
      },
    });
  }

  resetForm(): void {
    this.postTitle.set('');
    this.selectedImages.set([]);
    if (this.fileInput) {
      this.fileInput.value = '';
    }
  }

  isFormValid(): boolean {
    return this.postTitle().trim().length > 0;
  }
}
