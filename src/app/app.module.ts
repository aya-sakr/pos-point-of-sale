import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SalesModule } from './sales/sales.module';
import { OrdersModule } from './orders/orders.module';
import { SettingModule } from './setting/setting.module';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { ReturnModule } from './return/return.module';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    LayoutComponent,
    

 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    
    SalesModule,
    OrdersModule,
    SettingModule,
    ItemsModule,
    UsersModule,
    ReportsModule,
    ReturnModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
