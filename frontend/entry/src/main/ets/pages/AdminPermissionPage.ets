import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { AdminPermissionItem, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout } from '../utils/Constants';

@Entry
@Component
struct AdminPermissionPage {
  @State state: PageLoadState = 'loading';
  @State permissions: AdminPermissionItem[] = [];

  aboutToAppear(): void {
    this.permissions = PortalMockService.adminPermissions();
    this.state = this.permissions.length === 0 ? 'empty' : 'ready';
  }

  private revoke(item: AdminPermissionItem): void {
    AlertDialog.show({
      title: '确认撤销权限',
      message: `确定撤销 ${item.owner} 的 ${item.role} 权限吗？`,
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认撤销',
        fontColor: AppColors.danger,
        action: () => {
          this.permissions = this.permissions.filter((permission: AdminPermissionItem) => permission.id !== item.id);
          this.state = this.permissions.length === 0 ? 'empty' : 'ready';
          promptAction.showToast({ message: '权限已撤销' });
        }
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '管理员权限管理', subtitle: '管理不同角色的数据访问和配置权限' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无权限项', errorText: '权限数据加载失败' })
        } else {
          ForEach(this.permissions, (item: AdminPermissionItem) => {
            Row() {
              Column() {
                Text(`${item.role} · ${item.owner}`)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.scope} · ${item.enabled ? '已启用' : '已停用'}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              Button('撤销')
                .height(36)
                .fontSize(13)
                .fontColor(AppColors.danger)
                .backgroundColor(AppColors.dangerSoft)
                .borderRadius(8)
                .onClick(() => this.revoke(item))
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AdminPermissionItem): string => item.id)
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
