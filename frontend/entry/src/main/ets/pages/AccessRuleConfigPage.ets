import promptAction from '@ohos.promptAction';
import { PageTitleBar } from '../components/PageTitleBar';
import { StatePanel } from '../components/StatePanel';
import { AccessRuleItem, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from '../services/PortalMockService';
import { AppColors, AppLayout, AppRoutes } from '../utils/Constants';
import { PermissionUtil } from '../utils/PermissionUtil';

@Entry
@Component
struct AccessRuleConfigPage {
  @State state: PageLoadState = 'loading';
  @State rules: AccessRuleItem[] = [];

  aboutToAppear(): void {
    if (!PermissionUtil.ensurePageAccess(AppRoutes.accessRuleConfig)) {
      return;
    }
    this.rules = PortalMockService.accessRules();
    this.state = this.rules.length === 0 ? 'empty' : 'ready';
  }

  private removeRule(item: AccessRuleItem): void {
    AlertDialog.show({
      title: '确认删除规则',
      message: `删除 ${item.name} 后，对应门禁策略将不再生效。`,
      primaryButton: { value: '取消', action: () => {} },
      secondaryButton: {
        value: '确认删除',
        fontColor: AppColors.danger,
        action: () => {
          this.rules = this.rules.filter((rule: AccessRuleItem) => rule.id !== item.id);
          this.state = this.rules.length === 0 ? 'empty' : 'ready';
          promptAction.showToast({ message: '门禁规则已删除' });
        }
      }
    });
  }

  build() {
    Scroll() {
      Column({ space: 16 }) {
        PageTitleBar({ title: '门禁规则配置', subtitle: '配置通行时间、区域和风险处置策略' })
        if (this.state !== 'ready') {
          StatePanel({ state: this.state, emptyText: '暂无门禁规则', errorText: '门禁规则加载失败' })
        } else {
          ForEach(this.rules, (item: AccessRuleItem) => {
            Column({ space: 8 }) {
              Row() {
                Text(item.name)
                  .fontSize(17)
                  .fontWeight(FontWeight.Bold)
                  .fontColor(AppColors.text)
                  .layoutWeight(1)
                Button('删除')
                  .height(34)
                  .fontSize(13)
                  .fontColor(AppColors.danger)
                  .backgroundColor(AppColors.dangerSoft)
                  .borderRadius(8)
                  .onClick(() => this.removeRule(item))
              }
              Text(`${item.place} · ${item.timeRange}`)
                .fontSize(12)
                .fontColor(AppColors.muted)
              Text(`${item.riskPolicy} · ${item.enabled ? '已启用' : '已停用'}`)
                .fontSize(12)
                .fontColor(item.enabled ? AppColors.success : AppColors.warning)
            }
            .width('100%')
            .padding(14)
            .backgroundColor(AppColors.surface)
            .borderRadius(8)
            .border({ width: 1, color: AppColors.border })
          }, (item: AccessRuleItem): string => item.id)
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
