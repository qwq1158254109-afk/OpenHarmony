import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { AuthPermissionOption } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct AuthPermissionPage {
  @State permissionList: AuthPermissionOption[] = [];
  @State refreshVersion: number = 0;

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.authPermission)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    this.permissionList = PortalMockService.authPermissions(currentUser);
  }

  private togglePermission(id: string | number): void {
    let changed: boolean = false;

    this.permissionList = this.permissionList.map((item: AuthPermissionOption) => {
      if (String(item.id) === String(id)) {
        changed = true;

        const enabled: boolean = !item.enabled;
        return {
          id: item.id,
          name: item.name,
          scene: item.scene,
          enabled: enabled,
          riskLevel: enabled ? 'low' : 'high'
        } as AuthPermissionOption;
      }
      return item;
    });

    this.refreshVersion++;

    promptAction.showToast({
      message: changed ? '权限设置已更新' : '未找到对应权限项',
      duration: 1500
    });

    console.info(`permission toggled, id=${id}, changed=${changed}`);
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        Text(`${this.refreshVersion}`)
          .height(0)
          .opacity(0)
        PageTitleBar({ title: '我的授权设置', subtitle: '管理本人校园身份认证授权场景' })
        if (this.permissionList.length === 0) {
          StatePanel({ state: 'empty', emptyText: '暂无本人授权设置', errorText: '授权设置加载失败' })
        } else {
          ForEach(this.permissionList, (item: AuthPermissionOption) => {
            Row() {
              Column() {
                Text(item.name)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(item.scene)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              Row({ space: 6 }) {
                Blank()
                  .width(6)
                  .height(6)
                  .backgroundColor(item.enabled ? '#159957' : '#D93030')
                  .borderRadius(3)
                Text(item.enabled ? '低风险' : '高风险')
                  .fontSize(12)
                  .fontWeight(FontWeight.Medium)
                  .fontColor(item.enabled ? '#159957' : '#D93030')
              }
              .padding({ left: 9, right: 9, top: 5, bottom: 5 })
              .backgroundColor(item.enabled ? '#E8F8EF' : '#FFF0F0')
              .borderRadius(8)
              .border({ width: 1, color: item.enabled ? '#159957' : '#D93030' })
              Button(item.enabled ? '已开启' : '已关闭')
                .width(90)
                .height(36)
                .fontSize(13)
                .fontColor(item.enabled ? '#FFFFFF' : '#0F6F86')
                .backgroundColor(item.enabled ? '#0F6F86' : '#E6F6FB')
                .borderRadius(8)
                .margin({ left: 10 })
                .zIndex(2)
                .onClick(() => {
                  this.togglePermission(item.id);
                })
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AuthPermissionOption): string => `${String(item.id)}-${item.enabled ? 'on' : 'off'}`)
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
