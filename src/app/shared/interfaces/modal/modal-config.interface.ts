import { TemplateRef } from "@angular/core";
import { ActionButton } from "./action-button.interface";

export interface ModalConfig {
  template: TemplateRef<unknown>,
  actions: ActionButton[],
}
