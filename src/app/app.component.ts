import { User } from './_helpers/user.interface';
import { UserService } from './_helpers/user.service';
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
    users: User[] = [];
    registerForm: FormGroup;
    submitted: boolean = false;
    // submitted: boolean = false;
    constructor(private _toastr: ToastrService, private _formBuilder: FormBuilder, private _userService: UserService) {

    }

    ngOnInit() {
        this.setFromState();
        this.getAllUsers();
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
        this.submitted = true;

        if(this.registerForm.invalid)
        {
            return;
        }


    }

    onCancel() {
        this.registerForm.reset();
    }

    getAllUsers() {
        this._userService.getUsers().subscribe(res => {
            this.users = res;
            console.log(res);
        })
    }

    onEdit(userId: number)
    {

    }

    onDelete(userId: number)
    {
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
