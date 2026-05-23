import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MouseTrackingEffectDirective } from '../../../shared/directives/mouse-tracking-effect.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MouseTrackingEffectDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.css', '../mouse-tracking.css'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal<string | null>(null);

  protected readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set(null);

    const { username, password } = this.form.getRawValue();

    this.authService.login({ username, password }).subscribe({
      next: () => {
        this.errorMessage.set(null);
      },
      error: () => {
        this.errorMessage.set(
          'No se pudo iniciar sesión. Revisa tus credenciales e inténtalo de nuevo.',
        );
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
