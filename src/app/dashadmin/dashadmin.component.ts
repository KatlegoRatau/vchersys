import { Component, OnInit, NgZone } from '@angular/core';
import {Http} from '@angular/http';
import * as firebase from 'firebase/app';

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
    persons: any;

    isAdmin: boolean = false;

  constructor(private http: Http, private zone : NgZone) { }

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

     

      this.http.post('https://voucher-voucher.firebaseio.com/colleagues.json',colleague).subscribe((response)=>{
					
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
  ngOnInit() {

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
