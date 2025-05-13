import { Component, EventEmitter, Output, Input, ViewChild, SimpleChanges, ElementRef, AfterViewInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
declare const bootstrap: any;

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: true
})

export class UserFormComponent implements AfterViewInit, OnChanges {
  @Input() user: any = null;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  @ViewChild('modal') modalElement!: ElementRef;
  private modalInstance: any;

  firstName = '';
  lastName = '';
  email = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.firstName = this.user?.first_name || '';
      this.lastName = this.user?.last_name || '';
      this.email = this.user?.email || '';
    }
  }

  ngAfterViewInit() {
    this.initModal();
  }

  private initModal()
  {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });

    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.modalInstance = null;
    });
  }

  private resetForm()
  {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
  }

  open()
  {
    if(!this.modalInstance)
    {
      this.initModal();
    }
    this.modalInstance.show();
  }

  onClose() {
    this.resetForm();
    if(this.modalInstance)
    {
      this.modalInstance.hide();
    }
    this.close.emit();
  }

  onSave() {
    if (!this.firstName || !this.lastName || !this.email) return;
    const user = {
      ...this.user,
      first_name: this.firstName,
      last_name: this.lastName,
      email: this.email,
      avatar: this.user?.avatar || `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
    };
    this.resetForm();
    
    if(this.modalInstance)
    {
      this.modalInstance.hide();
    }
    this.save.emit(user);
  }
}