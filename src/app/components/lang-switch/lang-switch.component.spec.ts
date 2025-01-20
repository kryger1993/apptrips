import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangSwitchComponent } from './lang-switch.component';
import { TranslateModule } from '@ngx-translate/core';

describe('LangSwitchComponent', () => {
  let component: LangSwitchComponent;
  let fixture: ComponentFixture<LangSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LangSwitchComponent,
        TranslateModule.forRoot({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LangSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
