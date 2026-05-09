if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PageTitleBar_Params {
    title?: string;
    subtitle?: string;
    showBack?: boolean;
}
import router from "@ohos:router";
import { AppColors } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
export class PageTitleBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.title = '';
        this.subtitle = '';
        this.showBack = true;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageTitleBar_Params) {
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.subtitle !== undefined) {
            this.subtitle = params.subtitle;
        }
        if (params.showBack !== undefined) {
            this.showBack = params.showBack;
        }
    }
    updateStateVars(params: PageTitleBar_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private title: string;
    private subtitle: string;
    private showBack: boolean;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
            Row.margin({ top: 18, bottom: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showBack) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('返回');
                        Button.height(36);
                        Button.fontSize(13);
                        Button.fontColor(AppColors.primary);
                        Button.backgroundColor(AppColors.cyanSoft);
                        Button.borderRadius(8);
                        Button.onClick(() => router.back());
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
            Column.margin({ left: this.showBack ? 12 : 0 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.fontSize(24);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.subtitle.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.subtitle);
                        Text.fontSize(12);
                        Text.fontColor(AppColors.muted);
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
