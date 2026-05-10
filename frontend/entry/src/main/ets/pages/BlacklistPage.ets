import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { StatusBadge } from '../components/StatusBadge';
import { BlacklistItem, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct BlacklistPage {
  @State state: PageLoadState = 'loading';
  @State items: BlacklistItem[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.blacklist)) {
      return;
    }
    this.items = PortalMockService.blacklist();
    this.state = this.items.length === 0 ? 'empty' : 'ready';
  }

  private remove(item: BlacklistItem): void {
    AlertDialog.show({
      title: '确认移出黑名单',
      message: `确定将 ${item.name} 从黑名单移出吗？`,
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认移出',
        fontColor: AppColors.danger,
        action: () => {
          this.items = this.items.filter((record: BlacklistItem) => record.id !== item.id);
          this.state = this.items.length === 0 ? 'empty' : 'ready';
          promptAction.showToast({ message: '已移出黑名单' });
        }
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '黑名单管理', subtitle: '管理高风险账号和临时访问限制' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '当前无黑名单记录', errorText: '黑名单加载失败' })
        } else {
          ForEach(this.items, (item: BlacklistItem) => {
            Row() {
              Column() {
                Text(`${item.name} · ${item.studentId}`)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.reason} · ${item.createdAt}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              StatusBadge({ text: FormatUtil.riskLabel(item.level), status: item.level })
              Button('移出')
                .height(36)
                .fontSize(13)
                .fontColor(AppColors.danger)
                .backgroundColor(AppColors.dangerSoft)
                .borderRadius(8)
                .margin({ left: 10 })
                .onClick(() => this.remove(item))
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: item.level === 'high' ? AppColors.danger : AppColors.border })
          }, (item: BlacklistItem): string => item.id)
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
