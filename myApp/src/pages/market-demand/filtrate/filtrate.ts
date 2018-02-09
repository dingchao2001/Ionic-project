import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-filtrate',
  templateUrl: 'filtrate.html',
})
export class FiltratePage {
  city: string;
  @ViewChild('areasSelect') areasSelect;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltratePage');
  }
  
  showAreasSelect() {//触发城市列表
      this.areasSelect.open();
  }
  done(data) {//选择确定城市列表
      this.city = data.value;
  }
  closeSelect() {//关闭城市列表
      alert('你关闭了该功能')
  }
  submit() :void{
    
  }
}
