import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

  logo: string = 
  "file:///C:/Users/ANKIT/Desktop/angular/project/avnit/src/assets/anglogo.png";
  constructor(){

  }

  ngOnInit(): void {
    
  }
 
}
