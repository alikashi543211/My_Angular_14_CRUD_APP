import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular14CRUD-App';
    // regiterForm : FormGroup = new FormGroup({});
    registerForm: FormGroup;
    constructor(private _toastr: ToastrService, private _formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.setFromState();
    }

    setFromState() {
        this.registerForm = this._formBuilder.group({
            id: [0],
            title: ['', Validators.required],
            firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            dob: ['', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            confirmPassword: ['', Validators.compose([Validators.required])],
            acceptTerms: [false, Validators.compose([Validators.required])]
        })
    }

    onSubmit() {

    }

    onCancel() {
        this.registerForm.reset();
    }
}
