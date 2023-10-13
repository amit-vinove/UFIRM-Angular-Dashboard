import { NgModule } from '@angular/core';
import { SweetAlertsModule } from 'app/main/extensions/sweet-alerts/sweet-alerts.module';
import { ToastrsModule } from 'app/main/extensions/toastr/toastr.module';

@NgModule({
  declarations: [],
  imports: [
    SweetAlertsModule,
    ToastrsModule,
  ]
})
export class ExtensionsModule {}
