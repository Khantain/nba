import { TemplateRef } from "@angular/core";

export interface ActionButton {
  template: TemplateRef<unknown>,
  action?: () => unknown,
}
