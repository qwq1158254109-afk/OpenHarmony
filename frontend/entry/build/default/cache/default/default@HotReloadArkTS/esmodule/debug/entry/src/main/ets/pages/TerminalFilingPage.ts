if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TerminalFilingPage_Params {
    state?: PageLoadState;
    terminals?: TerminalDeviceRecord[];
}
import promptAction from "@ohos:promptAction";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import { StatePanel } from "@bundle:com.example.campusauth/entry/ets/components/StatePanel";
import type { PageLoadState, TerminalDeviceRecord } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
class TerminalFilingPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__terminals = new ObservedPropertyObjectPU([], this, "terminals");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TerminalFilingPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.terminals !== undefined) {
            this.terminals = params.terminals;
        }
    }
    updateStateVars(params: TerminalFilingPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__terminals.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__terminals.aboutToBeDeleted();
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
    private __terminals: ObservedPropertyObjectPU<TerminalDeviceRecord[]>;
    get terminals() {
        return this.__terminals.get();
    }
    set terminals(newValue: TerminalDeviceRecord[]) {
        this.__terminals.set(newValue);
    }
    aboutToAppear(): void {
        this.terminals = PortalMockService.terminalDevices();
        this.state = this.terminals.length === 0 ? 'empty' : 'ready';
    }
    private revoke(item: TerminalDeviceRecord): void {
        AlertDialog.show({
            title: '确认停用终端',
            message: `确定要停用 ${item.name} 吗？`,
            primaryButton: { value: '取消', action: () => { } },
            secondaryButton: {
                value: '确认停用',
                fontColor: AppColors.danger,
                action: () => {
                    this.terminals = this.terminals.filter((terminal: TerminalDeviceRecord) => terminal.id !== item.id);
                    this.state = this.terminals.length === 0 ? 'empty' : 'ready';
                    promptAction.showToast({ message: '终端已停用' });
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
                    let componentCall = new PageTitleBar(this, { title: '校园终端设备备案', subtitle: '备案门禁闸机、签到屏和实验室认证终端' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TerminalFilingPage.ets", line: 39, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '校园终端设备备案',
                            subtitle: '备案门禁闸机、签到屏和实验室认证终端'
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
                                let componentCall = new StatePanel(this, { state: this.state, emptyText: '暂无备案终端', errorText: '终端备案加载失败' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/TerminalFilingPage.ets", line: 41, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        state: this.state,
                                        emptyText: '暂无备案终端',
                                        errorText: '终端备案加载失败'
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
                                Row.create();
                                Row.width('100%');
                                Row.padding(14);
                                Row.backgroundColor(AppColors.surface);
                                Row.borderRadius(8);
                                Row.border({ width: 1, color: item.status === '在线' ? AppColors.border : AppColors.warning });
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.alignItems(HorizontalAlign.Start);
                                Column.layoutWeight(1);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.name);
                                Text.fontSize(17);
                                Text.fontWeight(FontWeight.Bold);
                                Text.fontColor(AppColors.text);
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(`${item.place} · ${item.status} · 心跳 ${item.lastHeartbeat}`);
                                Text.fontSize(12);
                                Text.fontColor(AppColors.muted);
                                Text.margin({ top: 4 });
                            }, Text);
                            Text.pop();
                            Column.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Button.createWithLabel('停用');
                                Button.height(36);
                                Button.fontSize(13);
                                Button.fontColor(AppColors.danger);
                                Button.backgroundColor(AppColors.dangerSoft);
                                Button.borderRadius(8);
                                Button.onClick(() => this.revoke(item));
                            }, Button);
                            Button.pop();
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.terminals, forEachItemGenFunction, (item: TerminalDeviceRecord): string => item.id, false, false);
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
        return "TerminalFilingPage";
    }
}
registerNamedRoute(() => new TerminalFilingPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/TerminalFilingPage", pageFullPath: "entry/src/main/ets/pages/TerminalFilingPage", integratedHsp: "false", moduleType: "followWithHap" });
