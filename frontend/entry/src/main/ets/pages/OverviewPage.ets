import router from '@ohos.router';
import promptAction from '@ohos.promptAction';
import { CategoryTabItem, CategoryTabs } from '../components/CategoryTabs';
import { ServiceIconItem } from '../components/ServiceIconItem';
import { StatePanel } from '../components/StatePanel';
import { PageLoadState, PortalAction } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { MockData } from '../services/MockData';
import { PortalMockService } from '../services/PortalMockService';
import { AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

interface ServiceGroup {
  id: string;
  title: string;
  subtitle: string;
  items: PortalAction[];
}

@Entry
@Component
struct OverviewPage {
  @State state: PageLoadState = 'loading';
  @State user: UserProfile = MockData.users[0];
  @State studentActions: PortalAction[] = [];
  @State teacherActions: PortalAction[] = [];
  @State watchActions: PortalAction[] = [];
  @State terminalActions: PortalAction[] = [];
  @State adminActions: PortalAction[] = [];
  @State demoActions: PortalAction[] = [];
  @State selectedCategory: string = '';
  @State hoverServiceId: string = '';
  @State selectedServiceId: string = '';
  @State logoutHover: boolean = false;
  private serviceScroller: Scroller = new Scroller();

  aboutToAppear(): void {
    const currentUser = AuthSessionService.currentUser();
    if (!AuthSessionService.isLoggedIn() || !currentUser) {
      router.replaceUrl({ url: AppRoutes.login });
      return;
    }
    this.user = currentUser;
    this.studentActions = this.user.role === 'student' ? PortalMockService.studentActions() : [];
    this.teacherActions = this.user.role === 'teacher' ? PortalMockService.teacherActions() : [];
    this.watchActions = this.user.role === 'student' ? PortalMockService.watchActions() : [];
    this.terminalActions = this.user.role === 'admin' ? PortalMockService.terminalActions() : [];
    this.adminActions = this.user.role === 'admin' ? PortalMockService.adminActions() : [];
    this.demoActions = this.user.role === 'admin' ? PortalMockService.demoActions() : [];
    const groups = this.visibleGroups();
    this.selectedCategory = groups.length > 0 ? groups[0].id : '';
    this.hoverServiceId = '';
    this.selectedServiceId = '';
    this.state = groups.length === 0 ? 'empty' : 'ready';
  }

  private visibleGroups(): ServiceGroup[] {
    return [
      { id: 'student', title: '学生端', subtitle: '本人认证、设备、授权、记录和通行状态', items: this.studentActions } as ServiceGroup,
      { id: 'teacher', title: '教师端', subtitle: '课程班级认证、学生异常提醒和课堂签到', items: this.teacherActions } as ServiceGroup,
      { id: 'watch', title: '穿戴设备', subtitle: '面向本人手表的今日考勤和通行反馈', items: this.watchActions } as ServiceGroup,
      { id: 'admin', title: '管理员端', subtitle: '风险评估、权限管理、系统审计和数据统计', items: this.adminActions } as ServiceGroup,
      { id: 'terminal', title: '设备管理', subtitle: '终端备案、设备接入和实时认证大屏', items: this.terminalActions } as ServiceGroup,
      { id: 'demo', title: '答辩演示', subtitle: '现场演示流程，不依赖真实设备', items: this.demoActions } as ServiceGroup
    ].filter((group: ServiceGroup) => group.items.length > 0);
  }

  private categoryTabs(): CategoryTabItem[] {
    return this.visibleGroups().map((group: ServiceGroup) => {
      return { id: group.id, title: group.title } as CategoryTabItem;
    });
  }

  private orderedGroups(): ServiceGroup[] {
    return this.visibleGroups();
  }

  private handleCategorySelect(id: string): void {
    this.selectedCategory = id;
    setTimeout(() => {
      this.serviceScroller.scrollTo({
        xOffset: 0,
        yOffset: this.groupScrollOffset(id),
        animation: { duration: 260, curve: Curve.EaseOut }
      });
    }, 30);
  }

  private groupScrollOffset(id: string): number {
    const groups = this.visibleGroups();
    let offset = 0;
    for (let index = 0; index < groups.length; index++) {
      if (groups[index].id === id) {
        return offset;
      }
      offset += this.groupVisualHeight(groups[index]);
    }
    return 0;
  }

  private groupVisualHeight(group: ServiceGroup): number {
    const rowCount = Math.ceil(group.items.length / 4);
    const gridHeight = rowCount * 150 + Math.max(0, rowCount - 1) * 26;
    return this.sectionTopMargin(group) + 34 + 22 + gridHeight;
  }

  private sectionTopMargin(group: ServiceGroup): number {
    if (this.user.role === 'teacher' && group.id === 'teacher') {
      return 14;
    }
    return 30;
  }

  private handleServiceHover(id: string, isHover: boolean): void {
    if (isHover) {
      this.hoverServiceId = id;
      return;
    }
    if (this.hoverServiceId === id) {
      this.hoverServiceId = '';
    }
  }

  private openService(item: PortalAction): void {
    this.selectedServiceId = item.id;
    if (!PermissionUtil.canViewFeature(this.user.role, item.route)) {
      promptAction.showToast({ message: '当前角色无权访问该功能' });
      return;
    }
    setTimeout(() => {
      router.pushUrl({ url: item.route });
    }, 160);
  }

  private logout(): void {
    AlertDialog.show({
      title: '确认退出',
      message: '确定要退出当前账号吗？',
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认退出',
        fontColor: '#C53030',
        action: () => {
          AuthSessionService.clearLogin();
          promptAction.showToast({ message: '已退出登录' });
          router.replaceUrl({ url: AppRoutes.login });
        }
      }
    });
  }

  @Builder
  ServiceSection(group: ServiceGroup) {
    Column() {
      Text(group.title)
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .fontColor('#111827')
        .width('100%')
        .margin({ top: this.sectionTopMargin(group), bottom: 22 })
      Grid() {
        ForEach(group.items, (item: PortalAction) => {
          GridItem() {
            Column() {
              ServiceIconItem({
                item: item,
                active: this.hoverServiceId === item.id || this.selectedServiceId === item.id
              })
            }
            .width('100%')
            .height(150)
            .alignItems(HorizontalAlign.Center)
            .justifyContent(FlexAlign.Start)
            .onHover((isHover: boolean) => {
              this.handleServiceHover(item.id, isHover);
            })
            .onClick(() => {
              this.openService(item);
            })
          }
        }, (item: PortalAction): string => item.id)
      }
      .columnsTemplate('1fr 1fr 1fr 1fr')
      .columnsGap(12)
      .rowsGap(26)
      .width('100%')
    }
    .width('100%')
  }

  build() {
    Column() {
      Row() {
        Blank()
          .width(56)
        Text('服务中心')
          .fontSize(28)
          .fontWeight(FontWeight.Bold)
          .fontColor('#111827')
          .textAlign(TextAlign.Center)
          .layoutWeight(1)
        Text('退出')
          .fontSize(15)
          .fontColor(this.logoutHover ? '#2D9CDB' : '#6B7280')
          .textAlign(TextAlign.Center)
          .width(56)
          .height(36)
          .backgroundColor(this.logoutHover ? '#EAF8FC' : Color.Transparent)
          .borderRadius(18)
          .onHover((isHover: boolean) => {
            this.logoutHover = isHover;
          })
          .onClick(() => {
            this.logout();
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20, top: 28, bottom: 22 })

      if (this.state === 'ready') {
        CategoryTabs({
          items: this.categoryTabs(),
          selectedId: this.selectedCategory,
          onSelect: (id: string) => {
            this.handleCategorySelect(id);
          }
        })
        Divider()
          .color('#EEEEEE')
          .margin({ top: 20 })
      }

      Scroll(this.serviceScroller) {
        Column() {
          if (this.state !== 'ready') {
            StatePanel({ state: this.state, emptyText: '暂无可用服务', errorText: '服务数据加载失败' })
          } else {
            ForEach(this.orderedGroups(), (group: ServiceGroup) => {
              this.ServiceSection(group)
            }, (group: ServiceGroup): string => group.id)
          }
        }
        .width('100%')
        .padding({ left: 24, right: 24, bottom: 34 })
      }
      .layoutWeight(1)
      .scrollBar(BarState.Off)
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
  }
}
