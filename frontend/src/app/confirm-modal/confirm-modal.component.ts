import { Component, ViewChild, AfterViewInit, Output, EventEmitter, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
declare const bootstrap: any;

@Component({
  selector: 'app-confirm-modal',
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
  standalone: true
})
export class ConfirmModalComponent implements AfterViewInit {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('modal') modalElement!: ElementRef;
  private modalInstance: any;

  ngAfterViewInit() {
    this.initModal();
  }

  private initModal() {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement, {
      backdrop: 'static',
      keyboard: false
    });

    this.modalElement.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.modalInstance = null;
    });
  }

  open() {
    if(!this.modalInstance)
    {
      this.initModal();
    }
    this.modalInstance.show();
  }

  close() {
    if(this.modalInstance)
    {
      this.modalInstance.hide();
    }
  }

  onConfirm() {
    this.confirm.emit();
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }
}
