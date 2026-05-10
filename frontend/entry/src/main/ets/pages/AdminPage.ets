import { PageTitleBar } from '../components/PageTitleBar';
import { SectionHeader } from '../components/SectionHeader';
import { StatCard } from '../components/StatCard';
import { StatusBadge } from '../components/StatusBadge';
import { AuthRecord } from '../models/Auth';
import { AuthService } from '../services/AuthService';
import { MockData } from '../services/MockData';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { FormatUtil } from '../utils/FormatUtil';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct AdminPage {
  aboutToAppear(): void {
    PermissionUtil.ensurePageAccess(AppRoutes.admin);
  }

  private records(): AuthRecord[] {
    return AuthService.recentRecords();
  }

  private abnormalRecords(): AuthRecord[] {
    return this.records().filter(item => item.result === 'failed' || item.risk.riskLevel === 'high');
  }

  private latestRiskRecord(): AuthRecord {
    const abnormal = this.abnormalRecords();
    return abnormal.length > 0 ? abnormal[0] : this.records()[0];
  }

  private riskColor(record: AuthRecord): string {
    if (record.risk.riskLevel === 'low') {
      return AppColors.success;
    }
    if (record.risk.riskLevel === 'medium') {
      return AppColors.warning;
    }
    return AppColors.danger;
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '全局风险评估', subtitle: '认证态势、异常事件和设备规模汇总' })

        Column({ space: 10 }) {
          Text('Campus Security Overview')
            .fontSize(13)
            .fontColor('#BDEBFF')
          Text('智慧校园身份安全态势')
            .fontSize(24)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
          Text('集中展示用户规模、认证总量、异常认证和设备绑定情况，便于比赛答辩说明系统治理能力。')
            .fontSize(13)
            .fontColor('#D7EEF7')
            .lineHeight(20)
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .padding(18)
        .backgroundColor(AppColors.hero)
        .borderRadius(8)

        Grid() {
          GridItem() {
            StatCard({ title: '用户数量', value: `${MockData.users.length}`, hint: '学生 / 教师 / 管理员', color: AppColors.primary })
          }
          GridItem() {
            StatCard({ title: '认证次数', value: `${this.records().length}`, hint: '今日模拟记录', color: AppColors.success })
          }
          GridItem() {
            StatCard({ title: '异常认证', value: `${this.abnormalRecords().length}`, hint: '失败或高风险', color: AppColors.danger })
          }
          GridItem() {
            StatCard({ title: '绑定设备', value: `${MockData.devices.length}`, hint: '手机 / 平板 / 穿戴', color: AppColors.accent })
          }
        }
        .columnsTemplate('1fr 1fr')
        .columnsGap(12)
        .rowsGap(12)
        .height(264)

        Column({ space: 12 }) {
          SectionHeader({ title: '全局风险评分', subtitle: '按低风险、中风险、高风险对认证行为分级' })
          Row() {
            Column() {
              Text(`${this.latestRiskRecord().risk.riskScore}`)
                .fontSize(34)
                .fontWeight(FontWeight.Bold)
                .fontColor(this.riskColor(this.latestRiskRecord()))
              Text(FormatUtil.riskLabel(this.latestRiskRecord().risk.riskLevel))
                .fontSize(14)
                .fontColor(this.riskColor(this.latestRiskRecord()))
                .margin({ top: 4 })
            }
            .alignItems(HorizontalAlign.Start)
            .width(96)
            Column() {
              Text(`${this.latestRiskRecord().userName} · ${FormatUtil.sceneLabel(this.latestRiskRecord().scene)}`)
                .fontSize(16)
                .fontWeight(FontWeight.Bold)
                .fontColor(AppColors.text)
              Text(this.latestRiskRecord().risk.riskReason)
                .fontSize(13)
                .fontColor(AppColors.muted)
                .lineHeight(19)
                .margin({ top: 6 })
              Text(this.latestRiskRecord().risk.suggestion)
                .fontSize(12)
                .fontColor(this.riskColor(this.latestRiskRecord()))
                .lineHeight(18)
                .margin({ top: 6 })
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
          }
          .width('100%')
          .padding(16)
          .backgroundColor(AppColors.surface)
          .borderRadius(8)
          .border({ width: 1, color: this.riskColor(this.latestRiskRecord()) })
        }

        Column({ space: 12 }) {
          SectionHeader({ title: '风险日志', subtitle: '用于答辩展示管理员审计能力' })
          ForEach(this.abnormalRecords().slice(0, 5), (item: AuthRecord) => {
            Column({ space: 8 }) {
              Row() {
                Text('!')
                  .fontSize(18)
                  .fontWeight(FontWeight.Bold)
                  .fontColor('#FFFFFF')
                  .textAlign(TextAlign.Center)
                  .width(40)
                  .height(40)
                  .backgroundColor(item.risk.riskLevel === 'high' ? AppColors.danger : AppColors.warning)
                  .borderRadius(8)
                Column() {
                  Text(`${item.userName} · ${FormatUtil.sceneLabel(item.scene)}`)
                    .fontSize(16)
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
                StatusBadge({ text: FormatUtil.riskLabel(item.risk.riskLevel), status: item.risk.riskLevel })
              }
              Text(item.risk.riskReason)
                .fontSize(13)
                .fontColor(AppColors.muted)
                .lineHeight(19)
              Text(item.risk.suggestion)
                .fontSize(12)
                .fontColor(AppColors.danger)
                .lineHeight(18)
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AuthRecord) => item.id)
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
