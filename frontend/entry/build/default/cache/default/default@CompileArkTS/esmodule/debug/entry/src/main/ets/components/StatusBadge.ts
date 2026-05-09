if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface StatusBadge_Params {
    text?: string;
    status?: AuthStatus | RiskLevel;
}
import type { AuthStatus } from '../models/Auth';
import type { RiskLevel } from '../models/Risk';
import { AppColors } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
export class StatusBadge extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.text = '';
        this.status = 'unauthenticated';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: StatusBadge_Params) {
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.status !== undefined) {
            this.status = params.status;
        }
    }
    updateStateVars(params: StatusBadge_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private text: string;
    private status: AuthStatus | RiskLevel;
    private color(): string {
        if (this.status === 'success' || this.status === 'low') {
            return AppColors.success;
        }
        if (this.status === 'failed' || this.status === 'high') {
            return AppColors.danger;
        }
        if (this.status === 'authenticating' || this.status === 'medium') {
            return AppColors.warning;
        }
        return AppColors.muted;
    }
    private fillColor(): string {
        if (this.status === 'success' || this.status === 'low') {
            return AppColors.successSoft;
        }
        if (this.status === 'failed' || this.status === 'high') {
            return AppColors.dangerSoft;
        }
        if (this.status === 'authenticating' || this.status === 'medium') {
            return AppColors.warningSoft;
        }
        return AppColors.surfaceSoft;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.padding({ left: 9, right: 9, top: 5, bottom: 5 });
            Row.backgroundColor(this.fillColor());
            Row.borderRadius(8);
            Row.border({ width: 1, color: this.color() });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(6);
            Blank.height(6);
            Blank.backgroundColor(this.color());
            Blank.borderRadius(3);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.color());
        }, Text);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
