import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./auth.component.css']
})
export class SignupComponent implements OnInit {
    myForm: FormGroup;
    validation: boolean = false;

    constructor(private authService: AuthService){}

    ngOnInit(){
        this.myForm = new FormGroup({
            'firstName': new FormControl(null, Validators.required),
            'email': new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            'password': new FormControl(null, Validators.required),
        });
    }
    onSubmit(){
        const user = new User(
                            this.myForm.value.email,
                            this.myForm.value.password,
                            this.myForm.value.firstName);
        this.authService.signup(user)
            .subscribe(
                data => {
                    console.log(data),
                    this.validation = false;
                },
                error => {
                    console.error(error)
                    if (error.error._message === 'User validation failed'){
                        this.validation = true;
                    }
                }
            )
        this.myForm.reset();
    }
    
}