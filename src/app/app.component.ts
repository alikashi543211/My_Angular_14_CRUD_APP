import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';
import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { DBOperation } from './_helpers/db-operation';
import { MustMatch } from './_helpers/must-match.validator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Angular14CRUD-App';
    // regiterForm : FormGroup = new FormGroup({});
    users: User[] = [];
    registerForm: FormGroup;
    submitted: boolean = false;
    buttonText: string = "Submit";
    dbops: DBOperation;
    constructor(private _toastr: ToastrService, private _formBuilder: FormBuilder, private _userService: UserService) {

    }

    ngOnInit() {
        this.setFromState();
        this.getAllUsers();
    }

    setFromState() {

        this.buttonText = "Submit";
        this.dbops = DBOperation.create;

        // this.registerForm = this._formBuilder.group({
        //     id: [0],
        //     title: ['', Validators.required],
        //     firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        //     lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
        //     email: ['', Validators.compose([Validators.required, Validators.email])],
        //     dob: ['', Validators.compose([Validators.required])],
        //     password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        //     confirmPassword: ['', Validators.compose([Validators.required])],
        //     acceptTerms: [false, Validators.compose([Validators.required])]
        // }, {
        //     validators: MustMatch('password', 'confirmPassword'),
        // })

        this.registerForm = new FormGroup({
            id: new FormControl(0),
            title: new FormControl('',  Validators.required),
            firstName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            lastName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            dob: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
            confirmPassword: new FormControl('', Validators.required),
            acceptTerms: new FormControl(false, Validators.required),
        },
            MustMatch('password', 'confirmPassword')
        );
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;
        console.log(this.registerForm.value);
        if (this.registerForm.invalid) {
            console.log("Invalid Values");
            return;
        }

        switch (this.dbops) {
            case DBOperation.create:
                this._userService.addUser(this.registerForm.value).subscribe(res => {
                    this._toastr.success("User Added !!", "User Registration");
                    this.getAllUsers();
                    this.onCancel();
                });
                break;
            case DBOperation.update:
                this._userService.updateUser(this.registerForm.value).subscribe(res => {
                    this._toastr.success("User Updated !!", "User Registration");
                    this.getAllUsers();
                    this.onCancel();
                });
                break;
        }

    }

    onCancel() {
        this.registerForm.reset();
        this.buttonText = "Submit";
        this.dbops = DBOperation.create;
        this.submitted = false;
    }

    getAllUsers() {
        this._userService.getUsers().subscribe(res => {
            this.users = res;
            console.log(res);
        })
    }

    onEdit(userId: number) {
        this.buttonText = "Update";
        this.dbops = DBOperation.update;

        let user = this.users.find((u: User) => u.id === userId);
        this.registerForm.patchValue(user);

        this.registerForm.get('password').setValue('');
        this.registerForm.get('confirmPassword').setValue('');
        this.registerForm.get('acceptTerms').setValue(false);
    }

    onDelete(userId: number) {
        Swal.fire({
            title: 'Are you sure?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it ',
            denyButtonText: `No, keep it`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this._userService.deleteUser(userId).subscribe(res => {
                    this.getAllUsers();
                    this._toastr.success("Deleted Successfully !!", "User Registration");
                    // Swal.fire('Record deleted successfully !', '', 'success')
                });

            } else if (result.isDenied) {
                Swal.fire('Record is saved', '', 'info')
            }
        })

    }
}
