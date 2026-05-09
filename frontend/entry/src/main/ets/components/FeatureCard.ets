import { AppColors } from '../utils/Constants';

@Component
export struct FeatureCard {
  title: string = '';
  subtitle: string = '';
  marker: string = '';
  active: boolean = false;

  build() {
    Row() {
      Text(this.marker)
        .fontSize(14)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.active ? '#FFFFFF' : AppColors.primary)
        .textAlign(TextAlign.Center)
        .width(38)
        .height(38)
        .backgroundColor(this.active ? AppColors.primary : AppColors.cyanSoft)
        .borderRadius(8)
      Column() {
        Text(this.title)
          .fontSize(15)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.text)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(this.subtitle)
          .fontSize(12)
          .fontColor(AppColors.muted)
          .lineHeight(17)
          .margin({ top: 4 })
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: 12 })
    }
    .width('100%')
    .height(86)
    .padding(12)
    .backgroundColor(this.active ? '#F2FAFD' : AppColors.surface)
    .borderRadius(8)
    .border({ width: 1, color: this.active ? AppColors.accent : AppColors.border })
    .shadow({ radius: 10, color: '#120F5068', offsetX: 0, offsetY: 4 })
    .alignItems(VerticalAlign.Center)
  }
}
