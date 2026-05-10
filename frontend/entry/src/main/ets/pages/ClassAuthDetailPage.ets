import router from '@ohos.router';
import { PageTitleBar } from '../components/PageTitleBar';
import { ClassAuthDetail, PageLoadState, StudentAuthRecord } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

interface ClassAuthRouteParams {
  classId?: string;
}

@Entry
@Component
struct ClassAuthDetailPage {
  @State state: PageLoadState = 'loading';
  @State detail: ClassAuthDetail = PortalMockService.classAuthDetail('tc1');

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.classAuthDetail)) {
      return;
    }
    const params = router.getParams() as ClassAuthRouteParams;
    const classId = params?.classId || 'tc1';
    this.detail = PortalMockService.classAuthDetail(classId);
    this.state = this.detail.students.length === 0 ? 'empty' : 'ready';
  }

  private statusBg(status: string): string {
    if (status === '已认证') {
      return '#DCFCE7';
    }
    if (status === '异常') {
      return '#FEE2E2';
    }
    return '#F3F4F6';
  }

  private statusColor(status: string): string {
    if (status === '已认证') {
      return '#16A34A';
    }
    if (status === '异常') {
      return '#EF4444';
    }
    return '#64748B';
  }

  private riskColor(riskLevel: string): string {
    if (riskLevel === '高风险') {
      return '#EF4444';
    }
    if (riskLevel === '中风险') {
      return '#F59E0B';
    }
    if (riskLevel === '低风险') {
      return '#16A34A';
    }
    return '#64748B';
  }

  @Builder
  StatItem(label: string, value: string, color: string) {
    Column({ space: 6 }) {
      Text(value)
        .fontSize(21)
        .fontWeight(FontWeight.Bold)
        .fontColor(color)
      Text(label)
        .fontSize(12)
        .fontColor(AppColors.muted)
    }
    .layoutWeight(1)
    .alignItems(HorizontalAlign.Center)
  }

  @Builder
  StatCard() {
    Column({ space: 16 }) {
      Row() {
        Text('认证统计')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.text)
        Blank()
        Text(`最近 ${this.detail.latestTime}`)
          .fontSize(12)
          .fontColor(AppColors.muted)
      }
      .width('100%')

      Row() {
        this.StatItem('应到人数', `${this.detail.totalCount}`, AppColors.text)
        this.StatItem('已认证', `${this.detail.signedCount}`, '#16A34A')
        this.StatItem('未认证', `${this.detail.unsignedCount}`, AppColors.muted)
      }
      .width('100%')

      Row() {
        this.StatItem('异常人数', `${this.detail.abnormalCount}`, '#EF4444')
        this.StatItem('完成率', `${this.detail.rate}%`, AppColors.primary)
        this.StatItem('最近认证', this.detail.latestTime, AppColors.text)
      }
      .width('100%')
    }
    .width('100%')
    .padding(18)
    .backgroundColor(AppColors.surface)
    .borderRadius(14)
    .border({ width: 1, color: AppColors.border })
  }

  @Builder
  StatusTag(text: string) {
    Text(text)
      .fontSize(12)
      .fontWeight(FontWeight.Medium)
      .fontColor(this.statusColor(text))
      .padding({ left: 10, right: 10, top: 5, bottom: 5 })
      .backgroundColor(this.statusBg(text))
      .borderRadius(12)
  }

  @Builder
  StudentRecordCard(record: StudentAuthRecord) {
    Column({ space: 10 }) {
      Row() {
        Column({ space: 4 }) {
          Text(record.name)
            .fontSize(17)
            .fontWeight(FontWeight.Bold)
            .fontColor(AppColors.text)
          Text(`学号：${record.studentNo}`)
            .fontSize(12)
            .fontColor(AppColors.muted)
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        this.StatusTag(record.status)
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)

      Row() {
        Text(`时间：${record.authTime}`)
          .fontSize(12)
          .fontColor(AppColors.muted)
          .layoutWeight(1)
        Text(`设备：${record.device}`)
          .fontSize(12)
          .fontColor(AppColors.muted)
      }
      .width('100%')

      Row() {
        Text('风险等级')
          .fontSize(12)
          .fontColor(AppColors.muted)
        Blank()
        Text(record.riskLevel)
          .fontSize(13)
          .fontWeight(FontWeight.Bold)
          .fontColor(this.riskColor(record.riskLevel))
      }
      .width('100%')
      .padding({ top: 8 })
      .border({ width: { top: 1 }, color: AppColors.border })
    }
    .width('100%')
    .padding(16)
    .backgroundColor(AppColors.surface)
    .borderRadius(14)
    .border({ width: 1, color: AppColors.border })
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '班级认证详情', subtitle: this.detail.className })

        this.StatCard()

        Text('学生认证明细')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor(AppColors.text)
          .width('100%')
          .margin({ top: 4 })

        if (this.state === 'empty') {
          Column({ space: 8 }) {
            Text('暂无学生认证明细')
              .fontSize(14)
              .fontColor(AppColors.muted)
          }
          .width('100%')
          .height(104)
          .justifyContent(FlexAlign.Center)
          .backgroundColor(AppColors.surface)
          .borderRadius(14)
          .border({ width: 1, color: AppColors.border })
        } else {
          ForEach(this.detail.students, (record: StudentAuthRecord) => {
            this.StudentRecordCard(record)
          }, (record: StudentAuthRecord): string => record.id)
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
