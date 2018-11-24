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

  isFilter:boolean = false;

  constructor(private http: Http,private zone : NgZone, private router: Router) {
    this.date =new Date();
   }


  onLogout()
  {
    this.isFilter = false;
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

  }

  onAddDepartment(form)
  {
    this.isFilter = false;
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
    this.isFilter = false;
    firebase.database().ref('department/' + department.key).remove();
    this.ngOnInit();

  }

  onFilter(form)
  {

   console.log(form.value.fliterOption);

   if(!form.value.fliterOption)
   {
      alert("Please select an option from the drop down list.");
      return;
   }


   //Sort Descending order
   if(form.value.fliterOption =='desc')
   {

    this.isFilter = true;

    let depts = [];
    for(let i = 0; i<this.departments.length; i++ )
    {

      for(let x = 0; x< this.events.length; x++)
      { 
          if(this.departments[i].department_id == this.events[x].department_id)
          {

            this.departments[i].voucher_id = this.events[x].voucher_id;
            depts.push(this.departments[i]);

          }

      }


    }


  let totalAmounts:number = 0;

  for(let d = 0; d < depts.length; d++)
  {
      totalAmounts = 0;
        for(let v = 0; v< this.vouchers.length; v++)
        {
          totalAmounts = this.vouchers[v].total_amount;

          if(depts[d].voucher_id == this.vouchers[v].voucher_id)
          {
              
           
             depts[d].total_amount = this.vouchers[v].total_amount

          }   

       


        }
  
        

  }


  console.log("=---=====Depts22222====---====");
 

  let total:number = 0;

  for(let i =0; i< this.departments.length; i++)
  {
    total = 0;
    for(let z = 0; z< depts.length; z++)
    {

      if(this.departments[i].department_id == depts[z].department_id)
      {
          total+= depts[z].total_amount;

      }


    }

    this.departments[i].full_amount =total;


  }

  console.log("=========");

   


  this.departments.sort(function(obj1, obj2) {
    // Ascending: first age less than the previous
  
      return obj2.full_amount - obj1.full_amount  ;
  });
  console.log("====sorted Desc=====");
  console.log(this.departments);



    //Sort Ascending order
   }else if(form.value.fliterOption =='asc')
   {
     this.isFilter = true;

    let depts = [];
    for(let i = 0; i<this.departments.length; i++ )
    {

      for(let x = 0; x< this.events.length; x++)
      { 
          if(this.departments[i].department_id == this.events[x].department_id)
          {

            this.departments[i].voucher_id = this.events[x].voucher_id;
            depts.push(this.departments[i]);

          }

      }


    }


  let totalAmounts:number = 0;

  for(let d = 0; d < depts.length; d++)
  {
      totalAmounts = 0;
        for(let v = 0; v< this.vouchers.length; v++)
        {
          totalAmounts = this.vouchers[v].total_amount;

          if(depts[d].voucher_id == this.vouchers[v].voucher_id)
          {
              
           
             depts[d].total_amount = this.vouchers[v].total_amount

          }   

       


        }
  
        

  }


  console.log("=---=====Depts22222====---====");
 

  let total:number = 0;

  for(let i =0; i< this.departments.length; i++)
  {
    total = 0;
    for(let z = 0; z< depts.length; z++)
    {

      if(this.departments[i].department_id == depts[z].department_id)
      {
          total+= depts[z].total_amount;

      }


    }

    this.departments[i].full_amount =total;


  }

  console.log("=========");

   


    this.departments.sort(function(obj1, obj2) {
      // Ascending: first age less than the previous
    
        return  obj1.full_amount - obj2.full_amount    ;
    });
    console.log("====sorted Asc=====");
    console.log(this.departments);




   }


   






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
