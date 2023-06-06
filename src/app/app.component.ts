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
    registerForm : FormGroup;
    constructor(private _toastr:ToastrService, private _formBuilder:FormBuilder)
    {

    }

    ngOnInit()
    {

    }

    setFromState()
    {
        this.registerForm = this._formBuilder.group({
            id: [0],
            title: ['', Validators.required],
            firstName: ['', Validators.required],
        })
    }
}
