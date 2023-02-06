import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent<T> {
  protected _options: T[] | null = [];
  protected selectedOption: T | null = null;

  @Input() placeholder = 'Select an option';
  @Input() optionTemplate!: TemplateRef<any>;

  @Input()
  set options(value: T[] | null) {
    this._options = value;
    if (this.selectedOption && !this._options?.includes(this.selectedOption))
      this.onChangeSelect(null);
  };

  @Output() selectionChange = new EventEmitter();

  onChangeSelect(newValue: T | null): void {
    this.selectedOption = newValue;
    this.selectionChange.emit(newValue);
  }
}
