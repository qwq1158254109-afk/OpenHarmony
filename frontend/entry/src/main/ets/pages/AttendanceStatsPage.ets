import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { AttendanceMetric, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';

@Entry
@Component
struct AttendanceStatsPage {
  @State state: PageLoadState = 'loading';
  @State metrics: AttendanceMetric[] = [];

  aboutToAppear(): void {
    this.metrics = PortalMockService.attendanceMetrics();
    this.state = this.metrics.length === 0 ? 'empty' : 'ready';
  }

  private rate(item: AttendanceMetric): number {
    if (item.total === 0) {
      return 0;
    }
    return Math.round(item.attended * 100 / item.total);
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '考勤统计', subtitle: '按课程展示学生到课率和最近签到时间' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无考勤数据', errorText: '考勤数据加载失败' })
        } else {
          ForEach(this.metrics, (item: AttendanceMetric) => {
            Column({ space: 10 }) {
              Row() {
                Text(item.course)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                  .layoutWeight(1)
                Text(`${this.rate(item)}%`)
                  .fontSize(22)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(this.rate(item) >= 90 ? AppColors.success : AppColors.warning)
              }
              Progress({ value: this.rate(item), total: 100, type: ProgressType.Linear })
                .color(this.rate(item) >= 90 ? AppColors.success : AppColors.warning)
                .height(8)
              Text(`已签到 ${item.attended}/${item.total} · 最近 ${item.latestTime}`)
                .fontSize(12)
                .fontColor(AppColors.muted)
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
