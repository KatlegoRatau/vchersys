import { Component, OnInit, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mealvoucher',
  templateUrl: './mealvoucher.component.html',
  styleUrls: ['./mealvoucher.component.css']
})
export class MealvoucherComponent implements OnInit {

  hasSent: boolean = false;
  isWait: boolean  = false;
  errorOccured: boolean = false;
  
  list:any;
  vouchers: any[];
  

  isEdit: boolean = false;
  editingVoucher: any;
  userInfo:any;
  date:any;
  constructor(private http: Http, private zone: NgZone,private router: Router) { 
    this.date =new Date();
  }


  onLogout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

  }

  onAddVoucher(form)
  {

      
      let user = localStorage.getItem("user");
      user = JSON.parse(user).fmno;  
      console.log(user);

      let total_amount:number = form.value.total_amount;
      let amount_spent:number = form.value.amount_spent;
      let balance:number = total_amount - amount_spent ;

      let status = "";

      if(balance==0)
      {
        
        
         status = "Used";

      }else {
       
        status = "Active";
      }
      



      let voucher = {

        voucher_id : form.value.voucher_id,
        total_amount : form.value.total_amount,
        amount_spent : form.value.amount_spent,
        balance : balance,
        voucher_status : status,
        reason : form.value.reason,
        user_fmno: user

      }

      let existingVoucher = this.vouchers.filter(v => v.voucher_id ==form.value.voucher_id );
       
      if(existingVoucher.length> 0)
      {

        alert("Voucher Already exists");


      }else{


             //send email
              let message = {
                to: this.userInfo.email,
                subject: 'Voucher',
                html : `Voucher ID: `+form.value.voucher_id+`<br> Total Amount: `+form.value.total_amount+
                    `<br>Amount Spent:`+form.value.amount_spent+` <br>Balance:`+ balance+ `<br>Voucher Status: `+status
                    +`<br> Reason:`+form.value.reason


          }

          let header = new Headers({'Content-Type': 'application/json', 'Authorization': 
                'Bearer '+'Access-Control-Allow-Origin'});

                console.log("Sending email");
          this.http.post('https://restend-restend.firebaseapp.com/admin/endp/sendv',message).subscribe((response)=>{
                
          
                
                console.log(response);
                
          }, (error)=>{
          
                
                console.log(error);
          });



            this.http.post('https://test-fe8f1.firebaseio.com/voucher.json',voucher).subscribe((response)=>{
              
              this.isWait = false;
              this.hasSent = true;
              setTimeout(()=>{   
                this.hasSent = false;
              },3000);
              this.ngOnInit();
              form.reset();
              
              console.log(response);
              
        }, (error)=>{
            this.isWait = false;
            this.errorOccured = true;
            
            setTimeout(()=>{   
                this.errorOccured = false;
              },3000);
              
              console.log(error);
        })



      }


      

  }

  onEdit(voucher)
  {

    this.isEdit = true;
    this.editingVoucher = voucher;

  }


  onUpdate(form)
  {


    let total_amount:number = form.value.total_amount;
      let amount_spent:number = form.value.amount_spent;
      let balance:number = total_amount - amount_spent ;

      let status = "Used";

      if(balance==0)
      {
        
        
         status = "Used";

      }else {
        
        status = "Active";
      }


      //send email
      let message = {
        to: this.userInfo.email,
        subject: 'Voucher Update',
        html : `Voucher ID: `+form.value.voucher_id+`<br> Total Amount: `+form.value.total_amount+
            `<br>Amount Spent:`+form.value.amount_spent+` <br>Balance:`+ balance+ `<br>Voucher Status: `+status
            +`<br> Reason:`+form.value.reason


        }

  

        console.log("Sending email");
        this.http.post('https://restend-restend.firebaseapp.com/admin/endp/sendu',message).subscribe((response)=>{
              
        
              
              console.log(response);
              
        }, (error)=>{
        
              
              console.log(error);
        });


      


      firebase.database().ref('voucher/' + this.editingVoucher.key).update({

        voucher_id : form.value.voucher_id,
        total_amount : form.value.total_amount,
        amount_spent : form.value.amount_spent,
        balance : balance,
        voucher_status : status,
        reason : form.value.reason,
    });
    this.isEdit = false;
    this.ngOnInit();


  }

  onDelete(voucher)
  {

    firebase.database().ref('voucher/' + voucher.key).remove();
    this.isEdit = false;
    this.ngOnInit();

  }

  ngOnInit() {

    this.userInfo = localStorage.getItem("user");
    this.userInfo = JSON.parse(this.userInfo);  
   

    this.list = firebase.database().ref('/voucher');
    this.list.on('value', (dataSnapshot)=> {
    this.vouchers = [];

   dataSnapshot.forEach((childSnapshot) => {
     let person = childSnapshot.val();
     person.key = childSnapshot.key
      
     if(this.userInfo.fmno == person.user_fmno)
     {

       this.vouchers.push(person);

     }
      

   });
     
   if(this.vouchers)
   {
      
      this.zone.run(()=> {});
   }
   });
  }

  

}
