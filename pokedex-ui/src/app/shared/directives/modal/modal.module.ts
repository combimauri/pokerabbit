import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalDirective } from './modal.directive';

@NgModule({
  declarations: [ModalDirective],
  imports: [CommonModule],
  exports: [ModalDirective]
})
export class ModalModule {}
