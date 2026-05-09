if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatePanel_Params {
    state?: PageLoadState;
    emptyText?: string;
    errorText?: string;
}
import type { PageLoadState } from '../models/CampusPortal';
import { AppColors } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
export class StatePanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.state = 'ready';
        this.emptyText = '暂无数据';
        this.errorText = '数据加载失败';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatePanel_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.emptyText !== undefined) {
            this.emptyText = params.emptyText;
        }
        if (params.errorText !== undefined) {
            this.errorText = params.errorText;
        }
    }
    updateStateVars(params: StatePanel_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private state: PageLoadState;
    private emptyText: string;
    private errorText: string;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state === 'loading') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 10 });
                        Row.width('100%');
                        Row.height(88);
                        Row.justifyContent(FlexAlign.Center);
                        Row.backgroundColor(AppColors.surface);
                        Row.borderRadius(8);
                        Row.border({ width: 1, color: AppColors.border });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(24);
                        LoadingProgress.height(24);
                        LoadingProgress.color(AppColors.primary);
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在加载...');
                        Text.fontSize(14);
                        Text.fontColor(AppColors.muted);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else if (this.state === 'empty') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 8 });
                        Column.width('100%');
                        Column.height(104);
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor(AppColors.surface);
                        Column.borderRadius(8);
                        Column.border({ width: 1, color: AppColors.border });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('空');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(AppColors.primary);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.emptyText);
                        Text.fontSize(14);
                        Text.fontColor(AppColors.muted);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.state === 'error') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 8 });
                        Column.width('100%');
                        Column.height(104);
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor(AppColors.dangerSoft);
                        Column.borderRadius(8);
                        Column.border({ width: 1, color: AppColors.danger });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('!');
                        Text.fontSize(18);
                        Text.fontWeight(FontWeight.Bold);
                        Text.fontColor(AppColors.danger);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorText);
                        Text.fontSize(14);
                        Text.fontColor(AppColors.danger);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
