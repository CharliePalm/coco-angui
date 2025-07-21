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
    'adhd_video_copy_ehpkfr.mov',
    'folklore_azul_de_estrellas_m43w7i.mp4',
    'gotalight_h44zw2.mp4',
    'interlinked_copy_nbwnpd.mp4',
    'liar_2.0_copy_upqvfg.mp4',
    'milan_wfvcj1.mp4',
    'abc_anxovn.mp4',
    'soundbath_FINAL_copy_cq1m6y.mov',
    'messup_dvybah.mov',
  ];
}
