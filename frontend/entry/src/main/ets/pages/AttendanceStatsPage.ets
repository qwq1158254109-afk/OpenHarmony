import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import router from '@ohos.router';
import { AttendanceMetric, PageLoadState } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct AttendanceStatsPage {
  @State state: PageLoadState = 'loading';
  @State metrics: AttendanceMetric[] = [];
  @State pageTitle: string = '我的课堂考勤';
  @State pageSubtitle: string = '按课程展示本人到课率和最近签到时间';
  @State isTeacherView: boolean = false;

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.attendanceStats)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    this.isTeacherView = currentUser?.role === 'teacher';
    if (currentUser?.role === 'teacher') {
      this.pageTitle = '班级认证概况';
      this.pageSubtitle = '按课程展示任课班级认证完成率和最近签到时间';
    } else if (currentUser?.role === 'admin') {
      this.pageTitle = '全局数据统计';
      this.pageSubtitle = '按学院和课程汇总出勤与认证概况';
    }
    this.metrics = PortalMockService.attendanceMetrics(currentUser);
    this.state = this.metrics.length === 0 ? 'empty' : 'ready';
  }

  private rate(item: AttendanceMetric): number {
    if (item.total === 0) {
      return 0;
    }
    return Math.round(item.attended * 100 / item.total);
  }

  private openClassDetail(item: AttendanceMetric): void {
    if (!this.isTeacherView) {
      return;
    }
    router.pushUrl({
      url: AppRoutes.classAuthDetail,
      params: {
        classId: item.id
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: this.pageTitle, subtitle: this.pageSubtitle })
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
              if (this.isTeacherView) {
                Row() {
                  Blank()
                  Text('查看详情 >')
                    .fontSize(13)
                    .fontWeight(FontWeight.Medium)
                    .fontColor(AppColors.primary)
                }
                .width('100%')
              }
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
            .onClick(() => {
              this.openClassDetail(item);
            })
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
