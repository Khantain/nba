import { Component } from '@angular/core';
import { ActionButton } from 'src/app/shared/interfaces/modal/action-button.interface';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(protected modalService: ModalService) { }

  onButtonClick(button: ActionButton) {
    if (button.action)
      button.action();

    this.modalService.close();
  }
}
