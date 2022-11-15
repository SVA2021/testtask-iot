import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';
import {AuthI} from 'src/app/types';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  form: FormGroup
  isSubmitted = false

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    })
  }


  submit() {
    if (this.form.invalid) {
      return
    }

    this.isSubmitted = true

    const user: AuthI = {
      email: this.form.value.email,
      password: this.form.value.password,
      personal_data_access: true
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.isSubmitted = false
      this.router.navigate(['/table'])
    })

  }
}
