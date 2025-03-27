import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MailtrapClient } from 'mailtrap';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit {
  sendEmailForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sendEmailForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  sendEmail(): void {
    this.apiService.sendMail(this.sendEmailForm.get('name').value,
      this.sendEmailForm.get('email').value, this.sendEmailForm.get('message').value)
      .subscribe({
        next: (value: string) => console.log(value),
        error: (error: string) => console.log(error),
      });
  }

}
