import { Component, ViewChildren, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Content, ModalController } from 'ionic-angular';
import { HttpService } from '../../providers/Http.service';
import { DATABASE } from '../../config/config';

@IonicPage()
@Component({
  selector: 'page-database',
  templateUrl: 'database.html',
})
export class DatabasePage {
  database: string = "project";//默认进入资料库的项目
  index: string = 'A';//当前选中的字母
  showModal: boolean = false;
  timeout: any;
  projectContacts: Array<any> = [];


  ownerContacts: Array<any> = [
    { groupName: 'A', it: ['222222肥嘟嘟', '的辅费', '对方答复发'] },
    { groupName: 'B', it: ['地方大幅度发', '第三方', '如同太容易', '地方', '东方电'] },
    { groupName: 'C', it: ['好难过', '如同太阳太容易', '如同太阳易', '地方', '东方闪电', '如同太阳太容易', '地方大度发', '如同太阳太容易', '如同太阳易'] },
    { groupName: 'F', it: ['和沐浴', '东闪电', '好难过', '如同太阳太容易', '如同太阳易', '地方', '东方闪电', '如同太阳太容易', '地方大度发', '如同太阳太容易', '好难过', '如同太阳太容易', '如同太阳易', '地方', '东方闪电', '如同太阳太容易', '地方大度发', '如同太阳太容易',] },
  ];


  companyContacts: Array<any> = [
    { groupName: 'A', it: ['33333333肥嘟嘟', '的辅导费', '对方答复发'] },
    { groupName: 'B', it: ['地方大度发', '如同太阳太容易', '如同太阳易', '地方', '东方闪电', '如同太阳太容易', '地方大度发', '如同太阳太容易', '如同太阳易', '地方', '东方闪电', '如同太阳太容易', '地方大度发', '如同太阳太容易', '如同太阳易', '地方'] },
    { groupName: 'E', it: ['好难过', '让他特任', '实打实大', '让他特任', '实打实大', '让他特任', '实打实大', '电风三十多岁多扇'] },
    { groupName: 'F', it: ['好难过', '让他特任', '实打实大', '让他特任', '实打实大', '电风三十多岁多扇'] },
    { groupName: 'G', it: ['和沐浴', '东方闪电', '如同太阳太容易'] },
  ];


  stationContacts: Array<any> = [
    { groupName: 'A', it: ['4444444肥嘟嘟', '的辅导费', '对方发'] },
    { groupName: 'B', it: ['方大幅度发', '第三方', '东方闪电', '地方', '东方闪电', '如同太容易'] },
    { groupName: 'C', it: ['好过', '让他特任', '电风扇', '电风三多扇'] },
    { groupName: 'R', it: ['和沐浴', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易', '东方闪电', '如同阳太容易'] },
  ];


  filesContacts: Array<any> = [
    { groupName: 'A', it: ['55555555肥嘟嘟', '的辅导费', '对方答复发'] },
    { groupName: 'B', it: ['地度发', '第方', '东闪电', '如同阳太容易', '如同太阳太容易', '地方', '如同太阳太容易'] },
    { groupName: '#', it: ['沐浴', '东方电', '如同太易', '第方', '东闪电', '如同阳太容易', '如同太阳太容易', '地方', '如同太阳太容易', '第方', '东闪电', '如同阳太容易', '如同太阳太容易', '地方', '如同太阳太容易'] },
  ];


  itemss = [];
  alphabet: Array<string> = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#".split('');//右侧检索导航
  offsetTops: Array<number> = [];//每段字母距离顶部的距离
  isAndroid: boolean = false;//判断是否为Android环境
  items: any;
  arr1: Array<any> = [];
  arr2: Array<any> = [];
  arr3: Array<any> = [];
  arr4: Array<any> = [];
  arr5: Array<any> = [];
  newArr: Array<any> = [];
  @ViewChildren('IonItemGroup1') ionItemGroup1;
  @ViewChild(Content) content: Content;

  constructor(platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public ref: ChangeDetectorRef,
    public http: HttpService,
    public modalCtrl: ModalController) {
    this.isAndroid = platform.is('android');
    for (var i = 0; i < 30; i++) {
      this.itemss.push(this.itemss.length);
    }
  }

  ionViewDidLoad() {
    //获取资料库的项目
    this.http.get(DATABASE + "customer/index/appProjectList")
      .then(res => {
        if (res.code) {
          this.projectContacts = res.data;
          for (var i = 0; i < this.projectContacts.length; i++) {
            this.arr1[i] = this.projectContacts[i].letter;
          }
        } else {
          this.http.presentToast(res.msg);
        }
      }).catch(() => {
        this.http.presentToast('服务器错误,请联系管理员');
      })

    for(let i = 0; i < this.ownerContacts.length; i++) {
      this.arr2[i] = this.ownerContacts[i].groupName;
    }
    for(let i = 0; i < this.companyContacts.length; i++) {
      this.arr3[i] = this.companyContacts[i].groupName;
    }
    for(let i = 0; i < this.stationContacts.length; i++) {
      this.arr4[i] = this.stationContacts[i].groupName;
    }
    for(let i = 0; i < this.filesContacts.length; i++) {
      this.arr5[i] = this.filesContacts[i].groupName;
    }
  }
  filterAlphabet(arr) {
    this.newArr = [];
    for (var i = 0; i < this.alphabet.length; i++) {
      for (var j = 0; j < arr.length; j++) {
        if (this.alphabet[i] == arr[j]) {
          this.newArr[j] = arr[j];
          break;
        }
      }
    }
  }

  ionViewDidEnter() {
    this.getOffsetTops();
    this.filterAlphabet(this.arr1);
  }

  sysChanged() {//选择类型
    this.content.scrollTo(0, 0, 0);
    this.index = "A";
    this.getOffsetTops();
  }

  transform(value: any) {
    let result: any;
    switch (value) {
      case "project":
        result = this.arr1;
        break;
      case "owner":
        result = this.arr2;
        break;
      case "company":
        result = this.arr3;
        break;
      case "station":
        result = this.arr4;
        break;
      case "files":
        result = this.arr5;
        break;
      default:
        result = this.arr1;
        break;
    }
    return result;
  }

  //每个字母距离顶部的距离
  getOffsetTops() {
    setTimeout(() => {
      this.filterAlphabet(this.transform(this.database));
      this.offsetTops = this.ionItemGroup1._results.map(ele => {
        return ele.nativeElement.offsetTop
      })
    }, 0)
  }

  selectIndex(index: number) {
    this.index = this.newArr[index];//获取选中字母
    const offsetTop = this.offsetTops[index];//获取选中字母距离顶部距离
    this.content.scrollTo(0, offsetTop, 300);//滑动到对应的位置
    this.createModal();
  }

  createModal() {
    clearTimeout(this.timeout);
    this.showModal = true;
    this.timeout = setTimeout(() => {
      this.showModal = false;
      this.ref.detectChanges();
    }, 800)
  }

  onScroll() {
    const threshold = 42;//字母标题的高度
    if (this.content.scrollTop < threshold) {
      this.index = this.newArr[0];
      return;
    }
    for (let i = this.offsetTops.length; i > 0; i--) {
      if (this.content.scrollTop + threshold >= this.offsetTops[i]) {
        this.index = this.newArr[i];
        this.ref.detectChanges();//手动监测变化
        return;
      }
    }
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      for (let i = 0; i < 20; i++) {
        this.itemss.push(this.itemss.length);
      }
      infiniteScroll.complete();
    }, 500);
  }

  //筛选
  gotoFilter() {
    this.navCtrl.push('ProjectFilterPage');
  }
  //新建项目
  addProject() {
    this.navCtrl.push('AddProjectPage');
  }
  //查看详情
  gotoDetails(id:string, token:string) {
    this.navCtrl.push('ProjectDetailsPage', { id: id, token: token });
  }
}
