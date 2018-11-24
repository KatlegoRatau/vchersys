import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WebComponent } from './web/web.component';
import { LogComponent } from './log/log.component';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashempComponent } from './dashemp/dashemp.component';
import { DashadminComponent } from './dashadmin/dashadmin.component';
import { FormsModule } from '@angular/forms';
import * as firebase from "firebase";
import { LogmainComponent } from './logmain/logmain.component';
import { MealvoucherComponent } from './mealvoucher/mealvoucher.component';
import { DeptComponent } from './dept/dept.component';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';

const config = {
  apiKey: "AIzaSyBPo1DUl9RjR5Zs11rpE2EOr0sPK3siXa4",
  authDomain: "test-fe8f1.firebaseapp.com",
  databaseURL: "https://test-fe8f1.firebaseio.com",
  projectId: "test-fe8f1",
  storageBucket: "test-fe8f1.appspot.com",
  messagingSenderId: "449727577212"
};

  
 firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    LogComponent,
    DashboardComponent,
    DashempComponent,
    DashadminComponent,
    LogmainComponent,
    MealvoucherComponent,
    DeptComponent,
    EventsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
		RouterModule.forRoot([
			{path: '', component: LogmainComponent},
      {path: 'login/:fmno', component: LogComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'admin', component: DashadminComponent},
      {path: 'mealvoucher', component: MealvoucherComponent},
      {path: 'department', component: DeptComponent},
      {path: 'events', component: EventsComponent},
      {path: 'logmain', component: LogmainComponent},
      {path: 'profile', component: ProfileComponent}

		
	])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
