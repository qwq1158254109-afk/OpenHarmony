import router from '@ohos.router';
import { AppColors } from '../utils/Constants';

@Component
export struct PageTitleBar {
  title: string = '';
  subtitle: string = '';
  showBack: boolean = true;

  build() {
    Row() {
      if (this.showBack) {
        Button('返回')
          .height(36)
          .fontSize(13)
          .fontColor(AppColors.primary)
          .backgroundColor(AppColors.cyanSoft)
          .borderRadius(8)
          .onClick(() => router.back())
      }
      Column() {
        Text(this.title)
          .fontSize(24)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.text)
        if (this.subtitle.length > 0) {
          Text(this.subtitle)
            .fontSize(12)
            .fontColor(AppColors.muted)
            .margin({ top: 4 })
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: this.showBack ? 12 : 0 })
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
    .margin({ top: 18, bottom: 4 })
  }
}
