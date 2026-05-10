if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AdminPage_Params {
}
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { SectionHeader } from "@bundle:com.example.campusauth/entry/ets/components/SectionHeader";
import { StatCard } from "@bundle:com.example.campusauth/entry/ets/components/StatCard";
import { StatusBadge } from "@bundle:com.example.campusauth/entry/ets/components/StatusBadge";
import type { AuthRecord } from '../models/Auth';
import { AuthService } from "@bundle:com.example.campusauth/entry/ets/services/AuthService";
import { MockData } from "@bundle:com.example.campusauth/entry/ets/services/MockData";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { FormatUtil } from "@bundle:com.example.campusauth/entry/ets/utils/FormatUtil";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
class AdminPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AdminPage_Params) {
    }
    updateStateVars(params: AdminPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
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
                    let componentCall = new PageTitleBar(this, { title: '全局风险评估', subtitle: '认证态势、异常事件和设备规模汇总' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 45, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '全局风险评估',
                            subtitle: '认证态势、异常事件和设备规模汇总'
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
            Column.create({ space: 10 });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
            Column.padding(18);
            Column.backgroundColor(AppColors.hero);
            Column.borderRadius(8);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('Campus Security Overview');
            Text.fontSize(13);
            Text.fontColor('#BDEBFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('智慧校园身份安全态势');
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('集中展示用户规模、认证总量、异常认证和设备绑定情况，便于比赛答辩说明系统治理能力。');
            Text.fontSize(13);
            Text.fontColor('#D7EEF7');
            Text.lineHeight(20);
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.columnsTemplate('1fr 1fr');
            Grid.columnsGap(12);
            Grid.rowsGap(12);
            Grid.height(264);
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '用户数量', value: `${MockData.users.length}`, hint: '学生 / 教师 / 管理员', color: AppColors.primary }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 68, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '用户数量',
                                    value: `${MockData.users.length}`,
                                    hint: '学生 / 教师 / 管理员',
                                    color: AppColors.primary
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "StatCard" });
                }
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '认证次数', value: `${this.records().length}`, hint: '今日模拟记录', color: AppColors.success }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 71, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '认证次数',
                                    value: `${this.records().length}`,
                                    hint: '今日模拟记录',
                                    color: AppColors.success
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "StatCard" });
                }
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '异常认证', value: `${this.abnormalRecords().length}`, hint: '失败或高风险', color: AppColors.danger }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 74, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '异常认证',
                                    value: `${this.abnormalRecords().length}`,
                                    hint: '失败或高风险',
                                    color: AppColors.danger
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "StatCard" });
                }
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatCard(this, { title: '绑定设备', value: `${MockData.devices.length}`, hint: '手机 / 平板 / 穿戴', color: AppColors.accent }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 77, col: 13 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: '绑定设备',
                                    value: `${MockData.devices.length}`,
                                    hint: '手机 / 平板 / 穿戴',
                                    color: AppColors.accent
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "StatCard" });
                }
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '全局风险评分', subtitle: '按低风险、中风险、高风险对认证行为分级' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 86, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '全局风险评分',
                            subtitle: '按低风险、中风险、高风险对认证行为分级'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SectionHeader" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(AppColors.surface);
            Row.borderRadius(8);
            Row.border({ width: 1, color: this.riskColor(this.latestRiskRecord()) });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.width(96);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.latestRiskRecord().risk.riskScore}`);
            Text.fontSize(34);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.riskColor(this.latestRiskRecord()));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(FormatUtil.riskLabel(this.latestRiskRecord().risk.riskLevel));
            Text.fontSize(14);
            Text.fontColor(this.riskColor(this.latestRiskRecord()));
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.latestRiskRecord().userName} · ${FormatUtil.sceneLabel(this.latestRiskRecord().scene)}`);
            Text.fontSize(16);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.latestRiskRecord().risk.riskReason);
            Text.fontSize(13);
            Text.fontColor(AppColors.muted);
            Text.lineHeight(19);
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.latestRiskRecord().risk.suggestion);
            Text.fontSize(12);
            Text.fontColor(this.riskColor(this.latestRiskRecord()));
            Text.lineHeight(18);
            Text.margin({ top: 6 });
        }, Text);
        Text.pop();
        Column.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: '风险日志', subtitle: '用于答辩展示管理员审计能力' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 127, col: 11 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '风险日志',
                            subtitle: '用于答辩展示管理员审计能力'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SectionHeader" });
        }
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
                    Text.create('!');
                    Text.fontSize(18);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor('#FFFFFF');
                    Text.textAlign(TextAlign.Center);
                    Text.width(40);
                    Text.height(40);
                    Text.backgroundColor(item.risk.riskLevel === 'high' ? AppColors.danger : AppColors.warning);
                    Text.borderRadius(8);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                    Column.margin({ left: 12 });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.userName} · ${FormatUtil.sceneLabel(item.scene)}`);
                    Text.fontSize(16);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor(AppColors.text);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${item.time} · ${item.location}`);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.muted);
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new StatusBadge(this, { text: FormatUtil.riskLabel(item.risk.riskLevel), status: item.risk.riskLevel }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/AdminPage.ets", line: 153, col: 17 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: FormatUtil.riskLabel(item.risk.riskLevel),
                                    status: item.risk.riskLevel
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "StatusBadge" });
                }
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.risk.riskReason);
                    Text.fontSize(13);
                    Text.fontColor(AppColors.muted);
                    Text.lineHeight(19);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.risk.suggestion);
                    Text.fontSize(12);
                    Text.fontColor(AppColors.danger);
                    Text.lineHeight(18);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.abnormalRecords().slice(0, 5), forEachItemGenFunction, (item: AuthRecord) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        Column.pop();
        Scroll.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "AdminPage";
    }
}
registerNamedRoute(() => new AdminPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/AdminPage", pageFullPath: "entry/src/main/ets/pages/AdminPage", integratedHsp: "false", moduleType: "followWithHap" });
