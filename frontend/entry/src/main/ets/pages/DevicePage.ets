import { FeatureCard } from '../components/FeatureCard';
import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatusBadge } from '../components/StatusBadge';
import { CampusDevice, DeviceType } from '../models/Device';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { DeviceTrustManager } from '../services/DeviceTrustManager';
import { DeviceService } from '../services/DeviceService';
import { MockData } from '../services/MockData';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct DevicePage {
  @State user: UserProfile = MockData.users[0];
  @State devices: CampusDevice[] = [];
  @State newType: DeviceType = 'tablet';
  private types: DeviceType[] = ['phone', 'tablet', 'wearable'];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.devices)) {
      return;
    }
    this.user = AuthSessionService.currentUser() || MockData.users[0];
    this.refresh();
  }

  private refresh(): void {
    this.devices = DeviceService.listDevices(this.user.id);
  }

  private addDevice(): void {
    DeviceService.bindDevice({
      userId: this.user.id,
      deviceName: DeviceService.nextDeviceName(this.newType),
      deviceType: this.newType,
      trusted: false
    });
    this.refresh();
  }

  private typeMarker(type: DeviceType): string {
    if (type === 'phone') {
      return 'PH';
    }
    if (type === 'tablet') {
      return 'TB';
    }
    return 'WT';
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '设备管理', subtitle: '绑定手机、平板和穿戴设备，配置可信认证能力' })

        Column({ space: 12 }) {
          SectionHeader({ title: '添加协同设备', subtitle: '模拟 OpenHarmony 分布式设备加入认证网络' })
          Grid() {
            ForEach(this.types, (item: DeviceType) => {
              GridItem() {
                FeatureCard({
                  title: FormatUtil.deviceTypeLabel(item),
                  subtitle: DeviceService.nextDeviceName(item),
                  marker: this.typeMarker(item),
                  active: this.newType === item
                })
                  .onClick(() => {
                    this.newType = item;
                  })
              }
            }, (item: DeviceType) => item)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(10)
          .rowsGap(10)
          .height(182)
          Button('添加设备')
            .width('100%')
            .height(44)
            .backgroundColor(AppColors.primary)
            .borderRadius(8)
            .onClick(() => this.addDevice())
        }
        .padding(16)
        .backgroundColor(AppColors.surface)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })

        SectionHeader({ title: '已绑定设备', subtitle: '可信设备可参与无感认证和跨端同步' })
        Grid() {
          ForEach(this.devices, (item: CampusDevice) => {
            GridItem() {
              Column({ space: 10 }) {
                Row() {
                  Text(this.typeMarker(item.type))
                    .fontSize(14)
                    .fontWeight(FontWeight.Bold)
                    .fontColor(item.trusted ? '#FFFFFF' : AppColors.primary)
                    .textAlign(TextAlign.Center)
                    .width(42)
                    .height(42)
                    .backgroundColor(item.trusted ? AppColors.primary : AppColors.cyanSoft)
                    .borderRadius(8)
                  Column() {
                    Text(item.name)
                      .fontSize(17)
                      .fontWeight(FontWeight.Bold)
                      .fontColor(AppColors.text)
                    Text(`${FormatUtil.deviceTypeLabel(item.type)} · ${item.lastSeen}`)
                      .fontSize(12)
                      .fontColor(AppColors.muted)
                      .margin({ top: 4 })
                    Text(`${item.deviceOs} · ${FormatUtil.distributedRoleLabel(item.distributedRole)}`)
                      .fontSize(12)
                      .fontColor(AppColors.muted)
                      .margin({ top: 4 })
                  }
                  .alignItems(HorizontalAlign.Start)
                  .layoutWeight(1)
                  .margin({ left: 12 })
                  StatusBadge({ text: item.online ? '在线' : '离线', status: item.online ? 'success' : 'unauthenticated' })
                }
                Row() {
                  StatusBadge({ text: `${DeviceTrustManager.label(item.trust.level)} ${item.trust.score}`, status: DeviceTrustManager.badgeStatus(item.trust.level) })
                  Blank()
                    .layoutWeight(1)
                }
                Text(item.trust.factors.join('、'))
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .lineHeight(18)
                Row({ space: 10 }) {
                  Button(item.trusted ? '取消可信' : '设为可信')
                    .layoutWeight(1)
                    .height(38)
                    .fontSize(13)
                    .fontColor(AppColors.primary)
                    .backgroundColor(AppColors.cyanSoft)
                    .borderRadius(8)
                    .onClick(() => {
                      DeviceService.toggleTrusted(item.id);
                      this.refresh();
                    })
                  Button('删除')
                    .layoutWeight(1)
                    .height(38)
                    .fontSize(13)
                    .fontColor(AppColors.danger)
                    .backgroundColor(AppColors.dangerSoft)
                    .borderRadius(8)
                    .onClick(() => {
                      DeviceService.removeDevice(item.id);
                      this.refresh();
                    })
                }
              }
              .width('100%')
              .padding(14)
              .backgroundColor(AppColors.surface)
              .borderRadius(8)
              .border({ width: 1, color: AppColors.border })
            }
          }, (item: CampusDevice) => item.id)
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
