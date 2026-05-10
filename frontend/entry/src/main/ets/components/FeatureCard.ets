import { AppColors } from '../utils/Constants';

@Component
export struct FeatureCard {
  title: string = '';
  subtitle: string = '';
  marker: string = '';
  active: boolean = false;
  hover: boolean = false;
  selected: boolean = false;
  @State hovered: boolean = false;

  private highlighted(): boolean {
    return this.selected || this.active || this.hover || this.hovered;
  }

  build() {
    Row() {
      Text(this.marker)
        .fontSize(16)
        .fontWeight(FontWeight.Bold)
        .fontColor(this.highlighted() ? '#FFFFFF' : AppColors.primary)
        .textAlign(TextAlign.Center)
        .width(48)
        .height(48)
        .backgroundColor(this.highlighted() ? AppColors.accent : AppColors.cyanSoft)
        .borderRadius(12)
      Column() {
        Text(this.title)
          .fontSize(17)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.highlighted() ? '#0F766E' : AppColors.text)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        Text(this.subtitle)
          .fontSize(13)
          .fontColor(AppColors.muted)
          .lineHeight(18)
          .margin({ top: 6 })
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      .margin({ left: 14 })
    }
    .width('100%')
    .height(120)
    .padding(18)
    .backgroundColor(this.highlighted() ? '#EAF8FC' : AppColors.surface)
    .borderRadius(16)
    .border({ width: this.highlighted() ? 2 : 1, color: this.highlighted() ? AppColors.accent : AppColors.border })
    .shadow({
      radius: this.highlighted() ? 14 : 4,
      color: this.highlighted() ? '#22000000' : '#11000000',
      offsetX: 0,
      offsetY: this.highlighted() ? 5 : 2
    })
    .scale({ x: this.highlighted() ? 1.02 : 1, y: this.highlighted() ? 1.02 : 1 })
    .animation({ duration: 160, curve: Curve.EaseOut })
    .alignItems(VerticalAlign.Center)
    .hoverEffect(HoverEffect.Highlight)
    .onHover((isHover: boolean) => {
      this.hovered = isHover;
    })
  }
}
