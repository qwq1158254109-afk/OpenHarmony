import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { FeatureCard } from '../components/FeatureCard';
import { SectionHeader } from '../components/SectionHeader';
import { StatePanel } from '../components/StatePanel';
import { StatCard } from '../components/StatCard';
import { PageLoadState, PortalAction, PortalStat } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { MockData } from '../services/MockData';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';

@Entry
@Component
struct OverviewPage {
  @State state: PageLoadState = 'loading';
  @State user: UserProfile = MockData.users[0];
  @State stats: PortalStat[] = [];
  @State studentActions: PortalAction[] = [];
  @State watchActions: PortalAction[] = [];
  @State terminalActions: PortalAction[] = [];
  @State adminActions: PortalAction[] = [];
  @State demoActions: PortalAction[] = [];

  aboutToAppear(): void {
    const currentUser = AuthSessionService.currentUser();
    if (!AuthSessionService.isLoggedIn() || !currentUser) {
      router.replaceUrl({ url: AppRoutes.login });
      return;
    }
    this.user = currentUser;
    this.stats = PortalMockService.overviewStats();
    this.studentActions = PortalMockService.studentActions();
    this.watchActions = PortalMockService.watchActions();
    this.terminalActions = PortalMockService.terminalActions();
    this.adminActions = PortalMockService.adminActions();
    this.demoActions = PortalMockService.demoActions();
    this.state = this.stats.length === 0 ? 'empty' : 'ready';
  }

  private go(url: string): void {
    router.pushUrl({ url });
  }

  private colorOf(status: string): string {
    if (status === 'success') {
      return AppColors.success;
    }
    if (status === 'warning') {
      return AppColors.warning;
    }
    if (status === 'danger') {
      return AppColors.danger;
    }
    return AppColors.primary;
  }

  private logout(): void {
    AlertDialog.show({
      title: '确认退出',
      message: '确定要退出当前账号吗？',
      primaryButton: { value: '取消', action: () => {} },
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

  @Builder
  ActionGrid(title: string, subtitle: string, actions: PortalAction[]) {
    Column({ space: 12 }) {
      SectionHeader({ title: title, subtitle: subtitle })
      if (actions.length === 0) {
        StatePanel({ state: 'empty', emptyText: '暂无可用功能' })
      } else {
        Grid() {
          ForEach(actions, (item: PortalAction) => {
            GridItem() {
              FeatureCard({
                title: item.title,
                subtitle: item.subtitle,
                marker: item.marker,
                active: item.status === 'success'
              })
                .onClick(() => this.go(item.route))
            }
          }, (item: PortalAction): string => item.title)
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
      }
    }
    .width('100%')
  }

  build() {
    Scroll() {
      Column({ space: 18 }) {
        Row() {
          Column() {
            Text('校园分布式无感身份认证系统')
              .fontSize(24)
              .fontWeight(FontWeight.Bold)
              .fontColor('#FFFFFF')
            Text(`${this.user.name} · ${this.user.account} · ${FormatUtil.roleLabel(this.user.role)}`)
              .fontSize(13)
              .fontColor('#D7EEF7')
              .margin({ top: 8 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
          Button('退出登录')
            .height(36)
            .fontSize(13)
            .fontColor('#FFFFFF')
            .backgroundColor('#2D9CDB')
            .borderRadius(8)
            .onClick(() => this.logout())
        }
        .width('100%')
        .padding(18)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)

        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无首页数据', errorText: '首页数据加载失败' })
        } else {
          Grid() {
            ForEach(this.stats, (item: PortalStat) => {
              GridItem() {
                StatCard({ title: item.title, value: item.value, hint: item.hint, color: this.colorOf(item.status) })
              }
            }, (item: PortalStat): string => item.title)
          }
          .columnsTemplate('1fr 1fr')
          .columnsGap(12)
          .rowsGap(12)
          .height(264)

          this.ActionGrid('学生端', '实名认证、设备绑定、权限设置、通行与考勤', this.studentActions)
          this.ActionGrid('答辩演示', '现场演示用一键模拟流程，不依赖真实设备', this.demoActions)
          this.ActionGrid('手表端', '面向轻量设备的今日考勤和通行反馈', this.watchActions)
          this.ActionGrid('校园终端端', '终端备案与实时认证大屏', this.terminalActions)
          this.ActionGrid('管理员端', '出勤、权限、门禁规则与黑名单治理', this.adminActions)
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
