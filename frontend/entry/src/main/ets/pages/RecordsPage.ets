import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { AuthRecord } from '../models/Auth';
import { UserProfile } from '../models/User';
import { AuthService } from '../services/AuthService';
import { MockData } from '../services/MockData';
import { AppColors, AppLayout } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';

type RecordFilter = 'all' | 'success' | 'failed' | 'high';

@Entry
@Component
struct RecordsPage {
  @State user: UserProfile = MockData.users[0];
  @State filter: RecordFilter = 'all';
  private filters: RecordFilter[] = ['all', 'success', 'failed', 'high'];

  aboutToAppear(): void {
    this.user = AppStorage.Get<UserProfile>('currentUser') || MockData.users[0];
  }

  private filterLabel(item: RecordFilter): string {
    if (item === 'all') {
      return '全部';
    }
    if (item === 'success') {
      return '成功';
    }
    if (item === 'failed') {
      return '失败';
    }
    return '高风险';
  }

  private records(): AuthRecord[] {
    const allRecords = this.user.role === 'admin' ? AuthService.recentRecords() : AuthService.recentRecords(this.user.id);
    if (this.filter === 'success' || this.filter === 'failed') {
      return allRecords.filter(item => item.result === this.filter);
    }
    if (this.filter === 'high') {
      return allRecords.filter(item => item.risk.riskLevel === 'high');
    }
    return allRecords;
  }

  private allRecords(): AuthRecord[] {
    return this.user.role === 'admin' ? AuthService.recentRecords() : AuthService.recentRecords(this.user.id);
  }

  private accountFor(record: AuthRecord): string {
    const user = MockData.users.find((item: UserProfile) => item.id === record.userId);
    return user ? user.account : record.userId;
  }

  private deviceIdFor(record: AuthRecord): string {
    const device = MockData.devices.find(item => item.userId === record.userId && item.name === record.deviceName);
    return device ? device.id : record.deviceName;
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '认证记录', subtitle: '追踪认证时间、地点、设备、结果和风险等级' })

        Grid() {
          GridItem() {
            StatCard({ title: '记录总数', value: `${this.allRecords().length}`, hint: '当前身份可见记录', color: AppColors.primary })
          }
          GridItem() {
            StatCard({ title: '高风险', value: `${this.allRecords().filter(item => item.risk.riskLevel === 'high').length}`, hint: '需管理员重点关注', color: AppColors.danger })
          }
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .height(126)

        Column({ space: 12 }) {
          SectionHeader({ title: '记录筛选', subtitle: '按认证结果和风险等级快速查看' })
          Row({ space: 8 }) {
            ForEach(this.filters, (item: RecordFilter) => {
              Button(this.filterLabel(item))
                .layoutWeight(1)
                .height(38)
                .fontSize(13)
                .fontColor(this.filter === item ? '#FFFFFF' : AppColors.primary)
                .backgroundColor(this.filter === item ? AppColors.primary : AppColors.cyanSoft)
                .borderRadius(8)
                .onClick(() => {
                  this.filter = item;
                })
            }, (item: RecordFilter) => item)
          }
          .width('100%')
        }
        .padding(16)
        .backgroundColor(AppColors.surface)
        .borderRadius(8)
        .border({ width: 1, color: AppColors.border })

        ForEach(this.records(), (item: AuthRecord) => {
          Column({ space: 10 }) {
            Row() {
              Text(FormatUtil.sceneLabel(item.scene).substring(0, 1))
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor('#FFFFFF')
                .textAlign(TextAlign.Center)
                .width(40)
                .height(40)
                .backgroundColor(item.result === 'success' ? AppColors.primary : AppColors.danger)
                .borderRadius(8)
              Column() {
                Text(`${FormatUtil.sceneLabel(item.scene)} · ${item.userName}`)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                Text(`${item.time} · ${item.location}`)
                  .fontSize(12)
                  .fontColor(AppColors.muted)
                  .margin({ top: 4 })
              }
              .alignItems(HorizontalAlign.Start)
              .layoutWeight(1)
              .margin({ left: 12 })
              StatusBadge({ text: item.result === 'success' ? '成功' : '失败', status: item.status })
            }
            Text(`${item.deviceName} · ${FormatUtil.methodLabel(item.method)}`)
              .fontSize(13)
              .fontColor(AppColors.muted)
            Row({ space: 10 }) {
              Text(`学号：${this.accountFor(item)}`)
                .fontSize(12)
                .fontColor(AppColors.text)
                .layoutWeight(1)
              Text(`设备 ID：${this.deviceIdFor(item)}`)
                .fontSize(12)
                .fontColor(AppColors.text)
                .layoutWeight(1)
            }
            .width('100%')
            Row() {
              Text(`风险评分 ${item.risk.riskScore}`)
                .fontSize(13)
                .fontWeight(FontWeight.Medium)
                .fontColor(AppColors.text)
                .layoutWeight(1)
              StatusBadge({ text: FormatUtil.riskLabel(item.risk.riskLevel), status: item.risk.riskLevel })
            }
            Text(item.risk.riskReason)
              .fontSize(12)
              .fontColor(AppColors.muted)
              .lineHeight(18)
            Text(item.risk.suggestion)
              .fontSize(12)
              .fontColor(AppColors.primary)
              .lineHeight(18)
          }
          .width('100%')
          .padding(14)
          .backgroundColor(AppColors.surface)
          .borderRadius(8)
          .border({ width: 1, color: AppColors.border })
        }, (item: AuthRecord) => item.id)
      }
      .width('100%')
      .constraintSize({ maxWidth: AppLayout.pageMaxWidth })
      .alignSelf(ItemAlign.Center)
      .padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 })
    }
    .backgroundColor(AppColors.background)
  }
}
