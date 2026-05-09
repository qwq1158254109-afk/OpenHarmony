import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { AttendanceMetric, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';

@Entry
@Component
struct AdminAttendanceStatsPage {
  @State state: PageLoadState = 'loading';
  @State metrics: AttendanceMetric[] = [];

  aboutToAppear(): void {
    this.metrics = PortalMockService.attendanceMetrics();
    this.state = this.metrics.length === 0 ? 'empty' : 'ready';
  }

  private rate(item: AttendanceMetric): number {
    return item.total === 0 ? 0 : Math.round(item.attended * 100 / item.total);
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '管理员出勤统计', subtitle: '管理员视角汇总课程出勤和异常缺勤' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无出勤统计', errorText: '出勤统计加载失败' })
        } else {
          ForEach(this.metrics, (item: AttendanceMetric) => {
            Row() {
              Column() {
                Text(item.course)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`出勤 ${item.attended}/${item.total} · 最近 ${item.latestTime}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              Text(`${this.rate(item)}%`)
                .fontSize(24)
                .fontWeight(FontWeight.Bold)
                .fontColor(this.rate(item) >= 90 ? AppColors.success : AppColors.warning)
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AttendanceMetric): string => item.id)
        }
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
