import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoriteComponent } from './components/add-to-favorite/add-to-favorite.component';
import { EffectsModule } from '@ngrx/effects';
import { AddToFavoriteEffect } from '@shared/modules/add-to-favorite/store/effects/add-to-favorite.effect';

@NgModule({
  declarations: [AddToFavoriteComponent],
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoriteEffect])],
  exports: [AddToFavoriteComponent],
})
export class AddToFavoriteModule {}
