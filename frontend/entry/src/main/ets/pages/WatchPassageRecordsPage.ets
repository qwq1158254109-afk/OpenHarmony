import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { StatusBadge } from '../components/StatusBadge';
import { PageLoadState, PassageRecordItem } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct WatchPassageRecordsPage {
  @State state: PageLoadState = 'loading';
  @State records: PassageRecordItem[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.watchPassageRecords)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    this.records = PortalMockService.passageRecords(currentUser).filter((item: PassageRecordItem) => item.deviceId.includes('watch'));
    this.state = this.records.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 14 }) {
        PageTitleBar({ title: '手表端通行记录', subtitle: '查看手表近场认证反馈' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无手表通行记录', errorText: '通行记录加载失败' })
        } else {
          ForEach(this.records, (item: PassageRecordItem) => {
            Column({ space: 8 }) {
              Row() {
                Text(item.place)
                  .fontSize(16)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                  .layoutWeight(1)
                StatusBadge({ text: item.result, status: item.riskLevel === 'high' ? 'failed' : 'success' })
              }
              Text(`${item.time} · ${item.deviceId}`)
                .fontSize(12)
                .fontColor(AppColors.muted)
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: PassageRecordItem): string => item.id)
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
