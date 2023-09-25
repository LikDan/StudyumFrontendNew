import { NgModule } from '@angular/core';

import { JournalComponent } from './journal.component';
import {RouterModule} from "@angular/router";
import {routes} from "./journal.routes";

@NgModule({
  declarations: [
    JournalComponent
  ],
  imports: [
      RouterModule.forChild(routes)
  ],
  providers: [],
})
export class JournalModule {
}
