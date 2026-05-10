import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { PageLoadState, RealNameProfile } from '../models/CampusPortal';
import { UserProfile } from '../models/User';
import { AuthSessionService } from '../services/AuthSessionService';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct StudentRealNamePage {
  @State state: PageLoadState = 'loading';
  @State profile: RealNameProfile = PortalMockService.realNameProfile();

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.studentRealName)) {
      return;
    }
    const currentUser: UserProfile | undefined = AuthSessionService.currentUser();
    this.profile = PortalMockService.realNameProfile(currentUser);
    this.state = this.profile.studentId.length === 0 ? 'empty' : 'ready';
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '身份认证状态', subtitle: '展示本人实名身份、学院、专业和认证来源' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无实名信息', errorText: '实名信息加载失败' })
        } else {
          Column({ space: 14 }) {
            Text(this.profile.name)
              .fontSize(30)
              .fontWeight(FontWeight.Bold)
              .fontColor(AppColors.text)
            Text(this.profile.status)
              .fontSize(14)
              .fontColor(AppColors.success)
              .padding({ left: 10, right: 10, top: 6, bottom: 6 })
              .backgroundColor(AppColors.successSoft)
              .borderRadius(8)
            this.InfoRow('学号', this.profile.studentId)
            this.InfoRow('学院', this.profile.college)
            this.InfoRow('专业班级', this.profile.major)
            this.InfoRow('认证来源', this.profile.credential)
          }
          .width('100%')
          .padding(18)
          .backgroundColor(AppColors.surface)
          .borderRadius(8)
          .border({ width: 1, color: AppColors.border })
          .shadow({ radius: 12, color: '#120F5068', offsetX: 0, offsetY: 4 })
        }
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }

  @Builder
  InfoRow(label: string, value: string) {
    Row() {
      Text(label)
        .fontSize(13)
        .fontColor(AppColors.muted)
        .width(78)
      Text(value)
        .fontSize(15)
        .fontColor(AppColors.text)
        .layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
    .border({ width: { bottom: 1 }, color: AppColors.border })
  }
}
