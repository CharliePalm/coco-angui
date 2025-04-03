import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkOption } from './shared/model';
import { PhotosComponent } from './workOptions/photos/photos.component';
import { VideosComponent } from './workOptions/videos/videos.component';
import { CoversComponent } from './workOptions/covers/covers.component';
import { FlyersComponent } from './workOptions/flyers/flyers.component';
import { AboutComponent } from './about/about.component';
import { ExhibitionsComponent } from './workOptions/exhibitions/exhibitions.component';
import { AnimationsComponent } from './workOptions/animations/animations.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: WorkOption.Photos, component: PhotosComponent },
  { path: WorkOption.Videos, component: VideosComponent },
  { path: WorkOption.Animations, component: AnimationsComponent },
  { path: WorkOption.Covers, component: CoversComponent },
  { path: WorkOption.Flyers, component: FlyersComponent },
  { path: WorkOption.Exhibitions, component: ExhibitionsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
