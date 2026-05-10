import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { StatusBadge } from '../components/StatusBadge';
import { PageLoadState, PassageRecordItem } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct PassageRecordsPage {
  @State state: PageLoadState = 'loading';
  @State records: PassageRecordItem[] = [];
  @State pageTitle: string = '我的认证记录';
  @State pageSubtitle: string = '查看本人近期认证、通行、设备登录记录';

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.passageRecords)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    if (currentUser?.role === 'teacher') {
      this.pageTitle = '课堂签到记录';
      this.pageSubtitle = '查看任课班级教学场景签到与认证记录';
    } else if (currentUser?.role === 'admin') {
      this.pageTitle = '系统审计记录';
      this.pageSubtitle = '查看全局认证、通行和风险处置记录';
    }
    this.records = PortalMockService.passageRecords(currentUser);
    this.state = this.records.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: this.pageTitle, subtitle: this.pageSubtitle })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无通行记录', errorText: '通行记录加载失败' })
        } else {
          ForEach(this.records, (item: PassageRecordItem) => {
            Column({ space: 10 }) {
              Row() {
                Text(item.place)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                  .layoutWeight(1)
                StatusBadge({ text: item.result, status: item.riskLevel === 'high' ? 'failed' : 'success' })
              }
              Row({ space: 10 }) {
                Text(`学号：${item.studentId}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
                Text(`设备 ID：${item.deviceId}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
              }
              Row() {
                Text(item.time)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .layoutWeight(1)
                StatusBadge({ text: FormatUtil.riskLabel(item.riskLevel), status: item.riskLevel })
              }
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: item.riskLevel === 'high' ? AppColors.danger : AppColors.border })
          }, (item: PassageRecordItem): string => item.id)
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
