import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent<T> implements OnInit {
  protected _options: T[] | null = [];
  protected selectedOption: T | null = null;

  @Input() placeholder?: string;
  @Input() defaultValue: T | null = null;
  @Input() optionTemplate!: TemplateRef<unknown>;

  @Input()
  set options(value: T[] | null) {
    this._options = value;
    if (this.selectedOption && !this._options?.includes(this.selectedOption))
      this.onChangeSelect(null);
  }

  @Output() selectionChange = new EventEmitter();

  ngOnInit() {
    this.selectedOption = this.defaultValue;
  }

  onChangeSelect(newValue: T | null): void {
    this.selectedOption = newValue;
    this.selectionChange.emit(newValue);
  }
}
