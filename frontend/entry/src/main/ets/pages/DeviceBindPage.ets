import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { BoundDeviceInfo, PageLoadState } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct DeviceBindPage {
  @State state: PageLoadState = 'loading';
  @State devices: BoundDeviceInfo[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.deviceBind)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    this.devices = PortalMockService.boundDevices(currentUser);
    this.state = this.devices.length === 0 ? 'empty' : 'ready';
  }

  private removeDevice(item: BoundDeviceInfo): void {
    AlertDialog.show({
      title: '确认解绑',
      message: `确定要解绑设备 ${item.name} 吗？`,
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认解绑',
        fontColor: AppColors.danger,
        action: () => {
          this.devices = this.devices.filter((device: BoundDeviceInfo) => device.id !== item.id);
          this.state = this.devices.length === 0 ? 'empty' : 'ready';
          promptAction.showToast({ message: '设备已解绑' });
        }
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '我的设备管理', subtitle: '绑定和管理本人参与无感认证的可信设备' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无绑定设备', errorText: '设备列表加载失败' })
        } else {
          ForEach(this.devices, (item: BoundDeviceInfo) => {
            Row() {
              Text(item.type.substring(0, 1))
                .fontSize(18)
                .fontWeight(FontWeight.Bold)
                .fontColor('#FFFFFF')
                .textAlign(TextAlign.Center)
                .width(44)
                .height(44)
                .backgroundColor(item.online ? AppColors.primary : AppColors.muted)
                .borderRadius(8)
              Column() {
                Text(item.name)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.id} · ${item.trustLevel} · ${item.online ? '在线' : '离线'}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 12 })
              Button('解绑')
                .height(36)
                .fontSize(13)
                .fontColor(AppColors.danger)
                .backgroundColor(AppColors.dangerSoft)
                .borderRadius(8)
                .onClick(() => this.removeDevice(item))
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: BoundDeviceInfo): string => item.id)
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
