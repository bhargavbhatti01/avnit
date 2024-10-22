import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../capitalize.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CapitalizePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  name: string = ' avNiT';

  amount: number = 1999;

  dateOfBirth = new Date();

  constructor() {

  }

  ngOnInit(): void {
    
  }

}
