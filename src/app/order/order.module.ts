import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { OrderComponent } from './order.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { TotalComprasComponent } from './total-compras/total-compras.component';

const ROUTES: Routes = [
    {path:'', component: OrderComponent}
]

@NgModule({
    declarations: [OrderComponent, OrderItemsComponent, TotalComprasComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class OrderModule {}