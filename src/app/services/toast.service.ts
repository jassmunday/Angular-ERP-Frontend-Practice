import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message?: string){
    return this.toastr.success(message || "Success");
  }
  showError(message?: string){
    return this.toastr.error(message || "Error");
  }
  showInfo(message?: string){
    return this.toastr.info(message || 'Information');
  }
  showWarning(message?:string){
    return this.toastr.warning(message || "Warning");
  }
}
