import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSharedComponent } from './table-shared.component';

describe('TableSharedComponent', () => {
  let component: TableSharedComponent;
  let fixture: ComponentFixture<TableSharedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableSharedComponent]
    });
    fixture = TestBed.createComponent(TableSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
