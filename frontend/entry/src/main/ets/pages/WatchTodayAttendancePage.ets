import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { PageLoadState, WatchAttendanceItem } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';

@Entry
@Component
struct WatchTodayAttendancePage {
  @State state: PageLoadState = 'loading';
  @State items: WatchAttendanceItem[] = [];

  aboutToAppear(): void {
    this.items = PortalMockService.watchAttendance();
    this.state = this.items.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 14 }) {
        PageTitleBar({ title: '手表端今日考勤', subtitle: '适配手表端的轻量考勤提醒' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '今日暂无考勤任务', errorText: '手表考勤加载失败' })
        } else {
          ForEach(this.items, (item: WatchAttendanceItem) => {
            Row() {
              Text(item.time)
                .fontSize(20)
                .fontWeight(FontWeight.Bold)
                .fontColor(AppColors.primary)
                .width(64)
              Column() {
                Text(item.title)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.place} · ${item.status}`)
                  .fontSize(12)
                  .fontColor(item.status === '已签到' ? AppColors.success : AppColors.warning)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: WatchAttendanceItem): string => item.id)
        }
      }
      .width('100%')
      .constraintSize({ maxWidth: 520 })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
