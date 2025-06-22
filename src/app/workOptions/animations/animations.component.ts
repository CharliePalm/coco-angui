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
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/adhd_video_copy_ehpkfr.mov',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/folklore_azul_de_estrellas_m43w7i.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/gotalight_h44zw2.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/interlinked_copy_nbwnpd.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/liar_2.0_copy_upqvfg.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/milan_wfvcj1.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/abc_anxovn.mp4',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/soundbath_FINAL_copy_cq1m6y.mov',
    'https://client-uploads-877b7177.s3.us-east-2.amazonaws.com/71db65b0-7081-7071-3f6f-b386c234050f/animations/messup_dvybah.mov',
  ];
}
