import { Component, OnInit } from '@angular/core';
import {of,from} from 'rxjs'
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  implements OnInit{
  name = 'Angular';

  ngOnInit(){
  of(2,3,4,5).subscribe(console.log);

  from([23,23,45,44]).subscribe(
    item=>console.log(`resulting items..${item}`),
    err=>console.error(`error occured ${err}`),
    ()=>console.log('complete')
  )
  
  }
}
