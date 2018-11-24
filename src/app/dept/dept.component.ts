import { Component, OnInit, NgZone } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept',
  templateUrl: './dept.component.html',
  styleUrls: ['./dept.component.css']
})
export class DeptComponent implements OnInit {


  hasSent: boolean = false;
  isWait: boolean  = false;
  errorOccured: boolean = false;
  
  list:any;
  departments: any[];

  userInfo: any;
  isAdmin:boolean = false;
  date:any;
  events:any;
  vouchers:any;
  constructor(private http: Http,private zone : NgZone, private router: Router) {
    this.date =new Date();
   }


  onLogout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

  }

  onAddDepartment(form)
  {

   let department = {

        department_id : form.value.department_id,
        department_name : form.value.department_name,
        charge_code : form.value.charge_code,
        fmno : form.value.fmno,
        role: form.value.role
       

      }

      let existingDepartmenyt = this.departments.filter(v => v.department_id ==form.value.department_id );
       
      if(existingDepartmenyt.length> 0)
      {

        alert("Department Already exists");


      }else{

            this.http.post('https://test-fe8f1.firebaseio.com/department.json',department).subscribe((response)=>{
              
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

  onDelete(department)
  {
    firebase.database().ref('department/' + department.key).remove();
    this.ngOnInit();

  }

  onFilter(form)
  {

    console.log(this.events);
    console.log(this.vouchers);
    this.vouchers.sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
    
        return obj2.total_amount - obj1.total_amount  ;
    });
    let newArrVoucherEvent = [];
    for(let i = 0; i< this.events.length; i++)
    {

        for(let v = 0; v< this.vouchers.length; v++)
        {

          if(this.events[i].voucher_id == this.vouchers[v].voucher_id)
          {
              newArrVoucherEvent.push(this.events[i]);

          }


        }

    }

    console.log('-------=====');
    console.log(newArrVoucherEvent);
  let vcher =[];
  let vcherEvent = [];


  for(let i = 0; i< newArrVoucherEvent.length; i++)
  {

    for(let x = 0; x< this.vouchers.length; x++)
    {

        if(newArrVoucherEvent[i].voucher_id == this.vouchers[x].voucher_id)
        {

            vcher.push(this.vouchers[x]);
            vcherEvent.push(newArrVoucherEvent[i]);

        }

    }

  }

  console.log("NEW====");
  console.log(vcher);
  console.log(vcherEvent);

  
  


  //   for(let i = 0; i < newArrVoucherEvent.length; i++)
  //   {

  //     for()

      
  //   }


  // console.log("=______00-009");
  // console.log(vcher);
  // console.log(vcherEvent);






  }

  ngOnInit() {

    

    this.userInfo = localStorage.getItem("user");
    this.userInfo = JSON.parse(this.userInfo); 

    if(this.userInfo.role =="admin")
    {
      this.isAdmin = true;
      console.log(this.isAdmin);

    }else{

      
      this.isAdmin = false;
      console.log(this.isAdmin);

    }

    this.list = firebase.database().ref('/department');
    this.list.on('value', (dataSnapshot)=> {
    this.departments = [];

   dataSnapshot.forEach((childSnapshot) => {
     let person = childSnapshot.val();
     person.key = childSnapshot.key
     
      this.departments.push(person);

   });
     
   if(this.departments)
   {
      
      this.zone.run(()=> {});
   }
   });



    //Events
      this.list = firebase.database().ref('/event');
      this.list.on('value', (dataSnapshot)=> {
      this.events = [];

    dataSnapshot.forEach((childSnapshot) => {
      let person = childSnapshot.val();
      person.key = childSnapshot.key
      
        this.events.push(person);

    });
      
    if(this.events)
    {
        
        this.zone.run(()=> {});
    }
    });


    this.list = firebase.database().ref('/voucher');
    this.list.on('value', (dataSnapshot)=> {
    this.vouchers = [];

   dataSnapshot.forEach((childSnapshot) => {
     let person = childSnapshot.val();
     person.key = childSnapshot.key
      
  

       this.vouchers.push(person);

   });
     
   if(this.vouchers)
   {
      
      this.zone.run(()=> {});
   }
   });




   

  }

    
  

}
