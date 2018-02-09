import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  id: string;
  token: string
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.id = navParams.get('id');
    this.token = navParams.get('token');
  }

  ionViewDidLoad() {
  }

}
