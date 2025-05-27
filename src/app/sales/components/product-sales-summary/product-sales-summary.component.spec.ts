import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesSummaryComponent } from './product-sales-summary.component';

describe('ProductSalesSummaryComponent', () => {
  let component: ProductSalesSummaryComponent;
  let fixture: ComponentFixture<ProductSalesSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductSalesSummaryComponent]
    });
    fixture = TestBed.createComponent(ProductSalesSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
