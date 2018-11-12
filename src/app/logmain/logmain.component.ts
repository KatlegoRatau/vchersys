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
  persons: any;
  colleague: any;
  constructor(private route: ActivatedRoute, private router: Router, private zone : NgZone) { }

  onLogin(form)
  {
        if(this.colleague)
        {

            if(form.value.email == this.colleague.email )
            {

              if(form.value.pwd == this.colleague.pwd)
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

              }

            }


        }

  }

  ngOnInit() {

    let countPeople = 0;
    this.route.paramMap.subscribe(params =>{
        let fmno = params.get("fmno");
        

        this.list = firebase.database().ref('/colleagues');
        this.list.on('value', (dataSnapshot)=> {
        this.persons = [];

      dataSnapshot.forEach((childSnapshot) => {
        let person = childSnapshot.val();
        person.key = childSnapshot.key
        countPeople++;
          this.persons.push(person);

      });
        
      if(this.persons.length == countPeople)
      {
          for(let i = 0; i< countPeople ; i++ )
          {
            console.log(this.persons[i].fmno);
              if(this.persons[i].fmno == fmno)
              {
                  
                  this.colleague = this.persons[i];
                  console.log(this.colleague);
                  this.zone.run(()=> {});
                  break;

              }

          }
      }
      });
    })
}

}
