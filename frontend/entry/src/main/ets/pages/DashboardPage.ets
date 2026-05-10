import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { FeatureCard } from '../components/FeatureCard';
import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { AuthRecord } from '../models/Auth';
import { PortalAction } from '../models/CampusPortal';
import { CampusDevice } from '../models/Device';
import { UserProfile } from '../models/User';
import { AuthService } from '../services/AuthService';
import { AuthSessionService } from '../services/AuthSessionService';
import { DeviceService } from '../services/DeviceService';
import { MockData } from '../services/MockData';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct DashboardPage {
  @State user: UserProfile = MockData.users[0];
  @State todayCount: number = 0;
  @State latestStatus: string = '未认证';
  @State latestRisk: string = '低风险';
  @State onlineDeviceCount: number = 0;
  @State trustedDeviceCount: number = 0;
  @State menuActions: PortalAction[] = [];
  @State hoverMenuKey: string = '';

  aboutToAppear(): void {
    AuthSessionService.initialize();
    const currentUser = AuthSessionService.currentUser();
    if (!AuthSessionService.isLoggedIn() || !currentUser) {
      router.replaceUrl({ url: AppRoutes.login });
      return;
    }
    this.user = currentUser;
    const records = AuthService.recentRecords(this.user.id);
    const devices = DeviceService.listDevices(this.user.id);
    if (this.user.role === 'student') {
      this.menuActions = PortalMockService.studentActions();
    } else if (this.user.role === 'teacher') {
      this.menuActions = PortalMockService.teacherActions();
    } else {
      this.menuActions = PortalMockService.adminActions();
    }
    this.todayCount = records.length;
    this.onlineDeviceCount = devices.filter((item: CampusDevice) => item.online).length;
    this.trustedDeviceCount = devices.filter((item: CampusDevice) => item.trusted).length;
    if (records.length > 0) {
      this.latestStatus = records[0].result === 'success' ? '认证成功' : '认证失败';
      this.latestRisk = FormatUtil.riskLabel(records[0].risk.riskLevel);
    }
  }

  private go(url: string): void {
    if (!PermissionUtil.canViewFeature(this.user.role, url)) {
      promptAction.showToast({ message: '当前角色无权访问该功能' });
      return;
    }
    router.pushUrl({ url });
  }

  private handleMenuHover(key: string, isHover: boolean): void {
    if (isHover) {
      this.hoverMenuKey = key;
      return;
    }
    if (this.hoverMenuKey === key) {
      this.hoverMenuKey = '';
    }
  }

  private logout(): void {
    AlertDialog.show({
      title: '确认退出',
      message: '确定要退出当前账号吗？',
      primaryButton: {
        value: '取消',
        action: () => {
        }
      },
      secondaryButton: {
        value: '确认退出',
        fontColor: AppColors.danger,
        action: () => {
          AuthSessionService.clearLogin();
          promptAction.showToast({ message: '已退出登录' });
          router.replaceUrl({ url: AppRoutes.login });
        }
      }
    });
  }

  private recentRecords(): AuthRecord[] {
    return AuthService.recentRecords(this.user.id).slice(0, 3);
  }

  build() {
    Scroll() {
      Column({ space: 18 }) {
        PageTitleBar({
          title: '智慧校园认证中心',
          subtitle: `${this.user.name} · ${FormatUtil.roleLabel(this.user.role)} · ${this.user.department}`,
          showBack: false
        })

        Row() {
          Blank()
          Button('退出登录')
            .height(36)
            .fontSize(13)
            .fontColor(AppColors.danger)
            .backgroundColor(AppColors.dangerSoft)
            .borderRadius(8)
            .onClick(() => {
              this.logout();
            })
        }
        .width('100%')

        Row() {
          Column() {
            Text('OpenHarmony 分布式无感身份认证')
              .fontSize(23)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Text('手机、平板和穿戴设备协同完成身份核验，适配考勤、门禁、图书馆和课堂签到场景。')
              .fontSize(13)
              .fontColor('#D7EEF7')
              .lineHeight(20)
              .margin({ top: 8 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
          Text(this.user.avatarText)
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor(AppColors.hero)
            .textAlign(TextAlign.Center)
            .width(52)
            .height(52)
            .backgroundColor('#DFF6FF')
            .borderRadius(8)
        }
        .width('100%')
        .alignItems(VerticalAlign.Center)
        .padding(18)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)

        Grid() {
          GridItem() {
            StatCard({ title: '当前学号', value: this.user.account, hint: FormatUtil.roleLabel(this.user.role), color: AppColors.primary })
          }
          GridItem() {
            StatCard({ title: '身份状态', value: '已登录', hint: `${this.user.college}`, color: AppColors.success })
          }
          GridItem() {
            StatCard({ title: '设备状态', value: `${this.onlineDeviceCount}/${this.trustedDeviceCount}`, hint: '在线设备 / 可信设备', color: AppColors.accent })
          }
          GridItem() {
            StatCard({ title: '最近认证', value: this.latestStatus, hint: `次数 ${this.todayCount} · ${this.latestRisk}`, color: this.latestStatus === '认证成功' ? AppColors.success : AppColors.warning })
          }
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
        .height(264)

        Column({ space: 12 }) {
          SectionHeader({ title: '快捷入口', subtitle: `${FormatUtil.roleLabel(this.user.role)}可访问功能` })
          Grid() {
            ForEach(this.menuActions, (item: PortalAction) => {
              GridItem() {
                this.MenuButton(item.title, item.subtitle, item.marker, item.route, item.status === 'success')
              }
            }, (item: PortalAction): string => item.id)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(12)
          .rowsGap(12)
        }
        .width('100%')

        Column({ space: 12 }) {
          SectionHeader({ title: '最近认证', subtitle: '手机发起，平板同步展示认证结果' })
          ForEach(this.recentRecords(), (item: AuthRecord) => {
            Row() {
              Column() {
                Text(FormatUtil.sceneLabel(item.scene))
                  .fontSize(16)
                  .fontWeight(FontWeight.Medium)
                  .fontColor(AppColors.text)
                Text(`${item.time} · ${item.location}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
                Text(`${item.deviceName} · ${FormatUtil.methodLabel(item.method)}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              StatusBadge({ text: item.result === 'success' ? '通过' : '失败', status: item.status })
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AuthRecord): string => item.id)
        }
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 28 })
    }
    .backgroundColor(AppColors.background)
  }

  @Builder
  MenuButton(title: string, subtitle: string, marker: string, url: string, active: boolean) {
    Column() {
      FeatureCard({
        title: title,
        subtitle: subtitle,
        marker: marker,
        active: active || this.hoverMenuKey === url,
        hover: this.hoverMenuKey === url
      })
    }
    .width('100%')
    .height(120)
    .borderRadius(16)
    .hoverEffect(HoverEffect.Highlight)
    .onHover((isHover: boolean) => {
      this.handleMenuHover(url, isHover);
    })
      .onClick(() => {
        this.go(url);
      })
  }
}
