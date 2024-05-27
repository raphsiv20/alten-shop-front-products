import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductsAdminComponent } from './products-admin/products-admin.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {ConfirmationService, MessageService} from 'primeng/api';
import { ProductsService } from 'app/services/products.service';


@NgModule({
  declarations: [ ProductsComponent, ProductsAdminComponent],
  imports: [CommonModule,
    SharedModule,
    RadioButtonModule,
    RippleModule,
    ButtonModule
  ],
  providers: [ProductsService, MessageService, ConfirmationService]
})
export class ProductModule { }


