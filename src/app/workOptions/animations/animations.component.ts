import { Component } from '@angular/core';
import { WorkOption } from 'src/app/shared/model';

@Component({
  selector: 'app-animations',
  standalone: false,
  templateUrl: './animations.component.html',
})
export class AnimationsComponent {
  upOption = WorkOption.Videos;
  downOption = WorkOption.Covers;

  public get offsetTop(): number {
    return window.innerWidth <= 768 ? 30 : 150;
  }

  animations = [
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488287/adhd_video_copy_ehpkfr.mov',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488292/folklore_azul_de_estrellas_m43w7i.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488284/gotalight_h44zw2.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488353/interlinked_copy_nbwnpd.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488340/liar_2.0_copy_upqvfg.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488328/milan_wfvcj1.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488274/abc_anxovn.mp4',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488356/soundbath_FINAL_copy_cq1m6y.mov',
    'https://res.cloudinary.com/dk3ymrwc5/video/upload/v1748488357/messup_dvybah.mov',
  ];
}
