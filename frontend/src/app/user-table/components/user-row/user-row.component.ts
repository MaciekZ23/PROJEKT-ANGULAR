import { Component, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter } from '@angular/core';

@Component({
  selector: '[app-user-row]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})

export class UserRowComponent {
  @Input() user: any;
  @Input() index!: number;

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<number>();
}
