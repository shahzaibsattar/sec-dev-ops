import { Component,OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Car } from '../car';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
 
 private dataservice = inject(DataService);
 

  cars:Car[] = [];
  
  ngOnInit(): void {
    //get a list of all of the cars fro the server.
    this.dataservice.getAllCars().subscribe({
      next: (data) =>{
       this.cars =data; 
      }
    });
  }

  onSelect(car:Car){
    this.dataservice.setcurrentcar(car);
  }
}
