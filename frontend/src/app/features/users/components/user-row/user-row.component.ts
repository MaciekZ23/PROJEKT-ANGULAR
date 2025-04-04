import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss']
})
export class UserRowComponent {
  @Input() user!: any;
  @Input() index!: number;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
}
