import { Component, OnInit, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  userInfo:any;
  list:any;
  vouchers:any;


  departments: any;

  hasSent: boolean = false;
  isWait: boolean  = false;
  errorOccured: boolean = false;

   events:any[];

   isAdmin:boolean = false;
  

  constructor(private http: Http, private zone: NgZone,private router: Router) { }

  onAddEvent(form)
  {
    let event = {

      event_id : form.value.event_id,
      event_date : form.value.event_date,
      voucher_id : form.value.voucher_id,
      department_id : form.value.department_id
     

    }

    let existingEvent = this.events.filter(v => v.event_id ==form.value.event_id);

    if(existingEvent.length> 0)
    {

      alert("Event Already exists");


    }else{

          this.http.post('https://test-fe8f1.firebaseio.com/event.json',event).subscribe((response)=>{
            
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

  onLogout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

  }

  onDelete(event)
  {
        
    firebase.database().ref('event/' + event.key).remove();
    this.ngOnInit();

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


   //Get Departments
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

   





  }

}
