import { AppColors } from '../utils/Constants';

@Component
export struct SectionHeader {
  title: string = '';
  subtitle: string = '';

  build() {
    Column() {
      Row() {
        Blank()
      }
      .width(34)
      .height(4)
      .backgroundColor(AppColors.accent)
      .borderRadius(2)
      .margin({ bottom: 8 })
      Text(this.title)
        .fontSize(19)
        .fontWeight(FontWeight.Bold)
        .fontColor(AppColors.text)
      if (this.subtitle.length > 0) {
        Text(this.subtitle)
          .fontSize(13)
          .fontColor(AppColors.muted)
          .margin({ top: 4 })
      }
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }
}
