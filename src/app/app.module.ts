import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PhotosComponent } from './workOptions/photos/photos.component';
import { VideosComponent } from './workOptions/videos/videos.component';
import { AboutComponent } from './about/about.component';
import { CoversComponent } from './workOptions/covers/covers.component';
import { FlyersComponent } from './workOptions/flyers/flyers.component';
import { HeaderComponent } from './header/header.component';
import { AnimationsComponent } from './workOptions/animations/animations.component';
import { WorkScrollerComponent } from './workOptions/work-scroller/work-scroller.component';
import { LoaderComponent } from './loader/loader.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { IconComponent } from './icon/icon.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PhotosComponent,
    VideosComponent,
    AboutComponent,
    CoversComponent,
    FlyersComponent,
    HeaderComponent,
    AnimationsComponent,
    WorkScrollerComponent,
    LoaderComponent,
    ImageGalleryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    IconComponent,
    NgOptimizedImage,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
