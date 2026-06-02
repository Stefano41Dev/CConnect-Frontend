import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  
  protected readonly form = new FormGroup({
    search: new FormControl('',{
      nonNullable: true,
      validators: [Validators.required],
    })
  });
  onSubmit() {
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const {search} = this.form.getRawValue();
    this.router.navigate(['/home/search', search]);
  }
}
