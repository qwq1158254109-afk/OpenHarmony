import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { PageLoadState, TerminalDeviceRecord } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct TerminalFilingPage {
  @State state: PageLoadState = 'loading';
  @State terminals: TerminalDeviceRecord[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.terminalFiling)) {
      return;
    }
    this.terminals = PortalMockService.terminalDevices();
    this.state = this.terminals.length === 0 ? 'empty' : 'ready';
  }

  private revoke(item: TerminalDeviceRecord): void {
    AlertDialog.show({
      title: '确认停用终端',
      message: `确定要停用 ${item.name} 吗？`,
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认停用',
        fontColor: AppColors.danger,
        action: () => {
          this.terminals = this.terminals.filter((terminal: TerminalDeviceRecord) => terminal.id !== item.id);
          this.state = this.terminals.length === 0 ? 'empty' : 'ready';
          promptAction.showToast({ message: '终端已停用' });
        }
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '校园终端设备备案', subtitle: '备案门禁闸机、签到屏和实验室认证终端' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无备案终端', errorText: '终端备案加载失败' })
        } else {
          ForEach(this.terminals, (item: TerminalDeviceRecord) => {
            Row() {
              Column() {
                Text(item.name)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.place} · ${item.status} · 心跳 ${item.lastHeartbeat}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              Button('停用')
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
            .border({ width: 1, color: item.status === '在线' ? AppColors.border : AppColors.warning })
          }, (item: TerminalDeviceRecord): string => item.id)
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
