import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./auth.component.css']
})
export class SigninComponent{
    myForm: FormGroup;
    validation: boolean = false;
    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(){
        this.myForm = new FormGroup({
            'email': new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null, Validators.required),
        });
    }
    onSubmit(){
        const user = new User (this.myForm.value.email, this.myForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/algorithm');
                },
                error => {
                    console.error(error);
                    if (error.error.message === 'Invalid login credentials'){
                        this.validation = true;
                    }
                }
            );
        this.myForm.reset();
    }
}