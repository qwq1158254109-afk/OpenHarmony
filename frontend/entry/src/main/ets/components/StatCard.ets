import { AppColors } from '../utils/Constants';

@Component
export struct StatCard {
  title: string = '';
  value: string = '';
  hint: string = '';
  color: string = AppColors.primary;

  build() {
    Column() {
      Row() {
        Text(this.title)
          .fontSize(13)
          .fontColor(AppColors.muted)
          .layoutWeight(1)
        Blank()
          .width(8)
          .height(26)
          .backgroundColor(this.color)
          .borderRadius(4)
      }
      .width('100%')
      Text(this.value)
        .fontSize(28)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.color)
        .margin({ top: 8 })
      Text(this.hint)
        .fontSize(12)
        .fontColor(AppColors.muted)
        .lineHeight(18)
        .margin({ top: 8 })
    }
    .width('100%')
    .height(126)
    .padding(16)
    .alignItems(HorizontalAlign.Start)
    .backgroundColor(AppColors.surface)
    .borderRadius(8)
    .border({ width: 1, color: AppColors.border })
    .shadow({ radius: 10, color: '#100F5068', offsetX: 0, offsetY: 4 })
  }
}
