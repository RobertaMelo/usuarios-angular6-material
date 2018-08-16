
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUsuariosComponent } from './table-usuarios.component';

describe('TableUsuariosComponent', () => {
  let component: TableUsuariosComponent;
  let fixture: ComponentFixture<TableUsuariosComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TableUsuariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
