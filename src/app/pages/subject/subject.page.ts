import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService } from './../../providers/subject/subject.service';
import { AlertController, IonList, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { SubjectDocument } from './../../interfaces/models/SubjectModel';

@Component({
  selector: 'subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  subject: SubjectDocument;
  defaultHref = '';

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    const subjectId = this.route.snapshot.paramMap.get('subjectId');
    console.log('subjectId', subjectId);
    const loading = await this.loadingCtrl.create({
      message: `Loading ...`
    });
    await loading.present();
    (await this.subjectService.getSubjectById(subjectId)).subscribe(
      async (res: any) => {
        this.subject = res;
        console.log('subject', this.subject);
        loading.dismiss();
      },
      async (error) => {
        // this.error = error;
        this.subject = null;
        loading.dismiss();
      }
    )
  }
  ionViewDidEnter() {
    this.defaultHref = `/app/tabs/home`;
  }

  getProperties() {
    return this.subject.properties;
  }
  getPropertyKeys() {
    let keys: string[] = []
    if (this.subject.properties) {
      keys = Object.keys(this.subject.properties);

    }
    return keys;
  }

}
