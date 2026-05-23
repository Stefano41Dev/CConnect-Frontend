import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MouseTrackingEffectDirective } from '../../../shared/directives/mouse-tracking-effect.directive';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MouseTrackingEffectDirective],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../auth.css', '../../../shared/directives/mouse-tracking.css'],
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)

  protected readonly submitted = signal(false);

  protected readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    fechaNacimiento: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
    terms: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.requiredTrue],
    }),
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitted.set(true);

    const {username,email, fechaNacimiento,password} = this.form.getRawValue();

    this.authService.register({username,email,fechaNacimiento,password}).subscribe({
      next: (response)=>{
          if(response.success){
            alert(response.mensaje);
          }
        }
      }
    )
  }
}
