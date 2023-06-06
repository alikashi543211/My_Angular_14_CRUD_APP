import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'TestAngularUpdated';

    constructor(private _toastr:ToastrService)
    {

    }

    ngOnInit()
    {
        this._toastr.success("Data Saved", "User Master");
        this._toastr.info("Data Message", "User Master");
        this._toastr.warning("Warning", "User Master");
        this._toastr.error("Error", "User Master");
    }
}
