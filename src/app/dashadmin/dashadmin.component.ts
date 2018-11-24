import { Component, OnInit, NgZone } from '@angular/core';
import {Http} from '@angular/http';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashadmin',
  templateUrl: './dashadmin.component.html',
  styleUrls: ['./dashadmin.component.css']
})
export class DashadminComponent implements OnInit {

  imageSrc: any;

    hasSent: boolean = false;
	  isWait: boolean  = false;
    errorOccured: boolean = false;
    
    list:any;
    persons: any[];

    isAdmin: boolean = false;

    userInfo: any;

    date: any;

  constructor(private http: Http, private zone : NgZone,private router:Router) { 

   
    this.date =new Date();

  }

  onDelete(colleague)
  {
        
    firebase.database().ref('colleagues/' + colleague.key).remove();
    this.ngOnInit();

  }

  onSubmit(form)
  {


      let colleague = {
        name : form.value.name,
        fmno: form.value.fmno,
        
        surname: form.value.surname,
        hiredate: form.value.hiredate,
        picture: this.imageSrc,
        email: form.value.email,
        isActive: false,
        role:"emp",
        pwd:""

      }

  
    

     





      let existingUser = this.persons.filter(p => p.fmno == form.value.fmno );

      if(existingUser.length > 0)
      {
          alert("The User already exists");

      }else{



              //send email
            let message = {
              to: form.value.email,
              subject: 'Password Creation From Voucher System',
              html : 'https://fbasesdk.firebaseapp.com/login/'+form.value.fmno


              }

              let header = new Headers({'Content-Type': 'application/json', 'Authorization': 
                    'Bearer '+'Access-Control-Allow-Origin'});

                    console.log("Sending email");
              this.http.post('https://restend-restend.firebaseapp.com/admin/endp/sendm',message).subscribe((response)=>{
                    
              
                    
                    console.log(response);
                    
              }, (error)=>{
              
                    
                    console.log(error);
              });


            //Post to Database
          this.http.post('https://test-fe8f1.firebaseio.com/colleagues.json',colleague).subscribe((response)=>{
            
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
    
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    /*if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }*/
	
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
   
  }

  onLogout()
  {
    localStorage.removeItem("user");
    localStorage.removeItem("control");
    this.router.navigate(['/logmain']);

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
    this.list = firebase.database().ref('/colleagues');
    this.list.on('value', (dataSnapshot)=> {
    this.persons = [];

   dataSnapshot.forEach((childSnapshot) => {
     let person = childSnapshot.val();
     person.key = childSnapshot.key
     
      this.persons.push(person);

   });
     
   if(this.persons)
   {
      console.log(this.persons);
      this.zone.run(()=> {});
   }
   });



   
  }

}
