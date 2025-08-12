import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-details',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.css'
})
export class ContactDetailsComponent implements OnInit {
  contactForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.contactForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: ['', Validators.required],
      orderNumber: [''],
      priority: ['medium'],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      newsletter: [false]
    });

    // Watch for subject changes to conditionally show order number field
    this.contactForm.get('subject')?.valueChanges.subscribe(value => {
      const orderNumberControl = this.contactForm.get('orderNumber');
      if (value === 'order' || value === 'delivery') {
        orderNumberControl?.setValidators([Validators.required]);
      } else {
        orderNumberControl?.clearValidators();
      }
      orderNumberControl?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitMessage = '';

      // Simulate form submission
      setTimeout(() => {
        this.simulateFormSubmission();
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private simulateFormSubmission(): void {
    try {
      const formData = this.contactForm.value;
      
      // In a real application, you would send this data to your backend
      console.log('Contact Form Data:', formData);
      
      // Simulate successful submission
      this.submitSuccess = true;
      this.submitMessage = 'Thank you for contacting us! We\'ll get back to you within 24 hours.';
      
      // Reset form after successful submission
      this.contactForm.reset({
        priority: 'medium',
        newsletter: false
      });
      
    } catch (error) {
      this.submitSuccess = false;
      this.submitMessage = 'Sorry, there was an error sending your message. Please try again.';
      console.error('Form submission error:', error);
    } finally {
      this.isSubmitting = false;
      
      // Clear message after 5 seconds
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  // Utility methods for template
  get formControls() {
    return this.contactForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${this.getFieldDisplayName(fieldName)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldDisplayName(fieldName)} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const fieldNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone number',
      subject: 'Subject',
      orderNumber: 'Order number',
      priority: 'Priority',
      message: 'Message'
    };
    return fieldNames[fieldName] || fieldName;
  }
}
