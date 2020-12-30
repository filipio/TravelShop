import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'remove-trip',
  templateUrl: './remove-trip.component.html',
  styleUrls: ['./remove-trip.component.css']
})
export class RemoveTripComponent {

  @Output() removed : EventEmitter<boolean> = new EventEmitter<boolean>();

  remove(){
    this.removed.emit(true);
  }
}
