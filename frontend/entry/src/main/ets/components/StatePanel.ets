import { PageLoadState } from '../models/CampusPortal';
import { AppColors } from '../utils/Constants';

@Component
export struct StatePanel {
  state: PageLoadState = 'ready';
  emptyText: string = '暂无数据';
  errorText: string = '数据加载失败';

  build() {
    if (this.state === 'loading') {
      Row({ space: 10 }) {
        LoadingProgress()
          .width(24)
          .height(24)
          .color(AppColors.primary)
        Text('正在加载...')
          .fontSize(14)
          .fontColor(AppColors.muted)
      }
      .width('100%')
      .height(88)
      .justifyContent(FlexAlign.Center)
      .backgroundColor(AppColors.surface)
      .borderRadius(8)
      .border({ width: 1, color: AppColors.border })
    } else if (this.state === 'empty') {
      Column({ space: 8 }) {
        Text('空')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.primary)
        Text(this.emptyText)
          .fontSize(14)
          .fontColor(AppColors.muted)
      }
      .width('100%')
      .height(104)
      .justifyContent(FlexAlign.Center)
      .backgroundColor(AppColors.surface)
      .borderRadius(8)
      .border({ width: 1, color: AppColors.border })
    } else if (this.state === 'error') {
      Column({ space: 8 }) {
        Text('!')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.danger)
        Text(this.errorText)
          .fontSize(14)
          .fontColor(AppColors.danger)
      }
      .width('100%')
      .height(104)
      .justifyContent(FlexAlign.Center)
      .backgroundColor(AppColors.dangerSoft)
      .borderRadius(8)
      .border({ width: 1, color: AppColors.danger })
    }
  }
}
