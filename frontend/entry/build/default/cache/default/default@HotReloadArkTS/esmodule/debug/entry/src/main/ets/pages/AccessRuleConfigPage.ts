if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AccessRuleConfigPage_Params {
    state?: PageLoadState;
    rules?: AccessRuleItem[];
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { AccessRuleItem, PageLoadState } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class AccessRuleConfigPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__rules = new ObservedPropertyObjectPU([], this, "rules");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AccessRuleConfigPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.rules !== undefined) {
            this.rules = params.rules;
        }
    }
    updateStateVars(params: AccessRuleConfigPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__rules.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__rules.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __state: ObservedPropertySimplePU<PageLoadState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: PageLoadState) {
        this.__state.set(newValue);
    }
    private __rules: ObservedPropertyObjectPU<AccessRuleItem[]>;
    get rules() {
        return this.__rules.get();
    }
    set rules(newValue: AccessRuleItem[]) {
        this.__rules.set(newValue);
    }
    aboutToAppear(): void {
        this.rules = PortalMockService.accessRules();
        this.state = this.rules.length === 0 ? 'empty' : 'ready';
    }
    private removeRule(item: AccessRuleItem): void {
        AlertDialog.show({
            title: '确认删除规则',
            message: `删除 ${item.name} 后，对应门禁策略将不再生效。`,
            primaryButton: { value: '取消', action: () => { } },
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.backgroundColor(AppColors.background);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.constraintSize({ maxWidth: AppLayout.pageMaxWidth });
            Column.alignSelf(ItemAlign.Center);
            Column.padding({ left: AppLayout.pagePadding, right: AppLayout.pagePadding, bottom: 30 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageTitleBar(this, { title: '门禁规则配置', subtitle: '配置通行时间、区域和风险处置策略' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AccessRuleConfigPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '门禁规则配置',
                            subtitle: '配置通行时间、区域和风险处置策略'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageTitleBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state !== 'ready') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无门禁规则', errorText: '门禁规则加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AccessRuleConfigPage.ets", line: 41, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无门禁规则',
                                        errorText: '门禁规则加载失败'
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "StatePanel" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create({ space: 8 });
                                Column.width('100%');
                                Column.padding(14);
                                Column.backgroundColor(AppColors.surface);
                                Column.borderRadius(8);
                                Column.border({ width: 1, color: AppColors.border });
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.name);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('删除');
                                Button.height(34);
                                Button.fontSize(13);
                                Button.fontColor(AppColors.danger);
                                Button.backgroundColor(AppColors.dangerSoft);
                                Button.borderRadius(8);
                                Button.onClick(() => this.removeRule(item));
                            }, Button);
                            Button.pop();
                            Row.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.place} · ${item.timeRange}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.riskPolicy} · ${item.enabled ? '已启用' : '已停用'}`);
                                Text.fontSize(12);
                                Text.fontColor(item.enabled ? AppColors.success : AppColors.warning);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.rules, forEachItemGenFunction, (item: AccessRuleItem): string => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AccessRuleConfigPage";
    }
}
registerNamedRoute(() => new AccessRuleConfigPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AccessRuleConfigPage", pageFullPath: "entry/src/main/ets/pages/AccessRuleConfigPage", integratedHsp: "false", moduleType: "followWithHap" });
