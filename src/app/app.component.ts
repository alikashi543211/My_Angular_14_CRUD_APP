import Swal from 'sweetalert2';
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
        // this._toastr.success("Data Saved", "User Master");
        // this._toastr.info("Data Message", "User Master");
        // this._toastr.warning("Warning", "User Master");
        // this._toastr.error("Error", "User Master");

        // Swal.fire('Hello Word');
        // Swal.fire('Oops...', 'Something went wrong!', 'error')
        // Swal.fire('Woww...', 'Good', 'success')
        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
    }
}
