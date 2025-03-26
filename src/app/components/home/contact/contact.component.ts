import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MailtrapClient } from 'mailtrap';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    standalone: false
})
export class ContactComponent implements OnInit {
  sendEmailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.sendEmailForm = this.formBuilder.group({
      name: ['', Validators.required],
      from: ['', [Validators.required, Validators.email]],
      text: ['', Validators.required],
    });
  }

  sendEmail(): void {
    const client = new MailtrapClient({ token: environment.emailId });
    const emailTo = environment.emailTo;

    client
      .send({
        from: this.sendEmailForm.get('from').value,
        to: [{ email: emailTo }],
        subject: 'Contact from marcelluna.com',
        text: this.sendEmailForm.get('text').value,
      })
      .then(console.log)
      .catch(console.error);
  }

}
