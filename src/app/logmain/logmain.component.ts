import { Component, OnInit , NgZone} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-logmain',
  templateUrl: './logmain.component.html',
  styleUrls: ['./logmain.component.css']
})
export class LogmainComponent implements OnInit {

  list: any;
  persons: any[];
  colleague: any;

  countPeople: number;
  constructor(private route: ActivatedRoute, private router: Router, private zone : NgZone) { }

  onLogin(form)
  {
      
      
          for(let i = 0; i< this.persons.length; i++)
          {

      
              if(this.persons[i].email == form.value.email )
              {

                if(this.persons[i].pwd == form.value.pwd)
                {
                    this.colleague = this.persons[i];
                  
                    break;

                }
              }

          }


          if(this.colleague)
          {

            if(this.colleague.role =="admin")
                {

                  localStorage.setItem("control","admin");
                  localStorage.setItem("user",JSON.stringify(this.colleague));
                  this.router.navigate(['/admin']);

                }else
                {

                  localStorage.setItem("control","emp");
                  localStorage.setItem("user",JSON.stringify(this.colleague));
                  this.router.navigate(['/admin']);

                }


          }else{

              alert("Invalid Email/Password");
          }
            
            // if(form.value.email == this.colleague.email )
            // {

            //   if(form.value.pwd == this.colleague.pwd)
            //   {

            //     if(this.colleague.role =="admin")
            //     {

            //       localStorage.setItem("control","admin");
            //       localStorage.setItem("user",JSON.stringify(this.colleague));
            //       this.router.navigate(['/admin']);

            //     }else
            //     {

            //       localStorage.setItem("control","emp");
            //       localStorage.setItem("user",JSON.stringify(this.colleague));
            //       this.router.navigate(['/admin']);

            //     }

            //   }

            // }

  }

  ngOnInit() {

    this.countPeople = 0;

        this.list = firebase.database().ref('/colleagues');
        this.list.on('value', (dataSnapshot)=> {
        this.persons = [];

      dataSnapshot.forEach((childSnapshot) => {
        let person = childSnapshot.val();
        person.key = childSnapshot.key
          this.countPeople ++;
          this.persons.push(person);
    

      });
        
    
      });
    
}

}
