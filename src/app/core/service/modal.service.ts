import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalConfig } from 'src/app/shared/interfaces/modal/modal-config.interface';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalSubject = new BehaviorSubject<ModalConfig | null>(null);
  modal$ = this.modalSubject.asObservable();

  display(config: ModalConfig) {
    this.modalSubject.next(config);
  }

  close() {
    this.modalSubject.next(null);
  }
}
