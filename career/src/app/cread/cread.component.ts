import { Component,OnInit,OnDestroy } from '@angular/core';
import {
  InsertedSuccess,
  StudentDetails,
  UniqueConstraintError,
} from '../student-details';
import {Subscription} from 'rxjs';
import { CrudService } from '../crud.service';
@Component({
  selector: 'app-cread',
  templateUrl: './cread.component.html',
  styleUrls: ['./cread.component.css']
})
export class CreadComponent implements OnInit,OnDestroy{
  Results: any;
      GotResult: boolean  | undefined;
     constructor(private Service: CrudService) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

     ngOnInit() {
      this.Read();
    }
      Subscription:Subscription=new Subscription();
     User: StudentDetails = {
      name: '',
      hallticketno: 0,
      gender: '',
      sclname: '',
      coursename: '',
      gpa: 0,
      phno: 0,
      address: '',
     };   SuccessMsg='';
     ErrorMsg='';
     a=[];
     
     Read(){
      this.Service.Read(this.User.hallticketno).subscribe({
        next: (Data : any) => {
          this.Results = Data.Result;
          this.GotResult = true;
        },
        error: (Err) => {
          console.log(Err);
        },
      });
     }
     Delete() {
      this.ErrorMsg = '';
      this.SuccessMsg = '';
      this.Subscription = this.Service.Delete(this.User.hallticketno).subscribe({
        next: (Data) => {
          if ('errorNum' in Data) {
            this.ErrorMsg = `${this.User.hallticketno} not Exists`;
          } else {
            this.SuccessMsg = `${this.User.hallticketno} Deleted Succesfully`;
          }
        },
        error: (Error) => {
          console.log(Error);
        },
      });
         
  this.ngOnDestroy();{
    this.Subscription.unsubscribe();
  }
  
}
}
 
