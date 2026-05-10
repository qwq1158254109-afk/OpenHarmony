if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ServiceIconItem_Params {
    item?: PortalAction;
    active?: boolean;
}
import type { PortalAction } from '../models/CampusPortal';
export class ServiceIconItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.item = {
            id: '',
            title: '',
            subtitle: '',
            marker: '',
            route: '',
            status: 'info',
            roles: []
        };
        this.active = false;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ServiceIconItem_Params) {
        if (params.item !== undefined) {
            this.item = params.item;
        }
        if (params.active !== undefined) {
            this.active = params.active;
        }
    }
    updateStateVars(params: ServiceIconItem_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private item: PortalAction;
    private active: boolean;
    private iconResource(): Resource {
        if (this.item.id === 'my-auth-status') {
            return { "id": 16777229, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'my-devices' || this.item.id === 'device-management' || this.item.id === 'terminal-filing') {
            return { "id": 16777228, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'my-auth-settings') {
            return { "id": 16777230, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'my-auth-records' || this.item.id === 'class-checkin-records' || this.item.id === 'system-audit') {
            return { "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'my-risk-alerts' || this.item.id === 'student-alerts' || this.item.id === 'global-risk') {
            return { "id": 16777233, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'campus-passage-status') {
            return { "id": 16777224, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'class-auth-overview' || this.item.id === 'teaching-auth') {
            return { "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'watch-attendance' || this.item.id === 'watch-passage') {
            return { "id": 16777225, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'terminal-realtime' || this.item.id === 'data-statistics') {
            return { "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'user-permission') {
            return { "id": 16777236, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'risk-policy') {
            return { "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'blacklist') {
            return { "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.id === 'defense-demo') {
            return { "id": 16777227, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        if (this.item.roles.includes('admin')) {
            return { "id": 16777222, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
        }
        return { "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.campusauth", "moduleName": "entry" };
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            globalThis.Context.animation({ duration: 160, curve: Curve.EaseOut });
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Center);
            Column.scale({ x: this.active ? 1.04 : 1, y: this.active ? 1.04 : 1 });
            globalThis.Context.animation(null);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(72);
            Column.height(72);
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor(this.active ? '#EAF8FC' : '#F6F6F6');
            Column.borderRadius(18);
            Column.border({
                width: this.active ? 1.5 : 0,
                color: this.active ? '#2D9CDB' : Color.Transparent
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.iconResource());
            Image.width(40);
            Image.height(40);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.title);
            Text.fontSize(16);
            Text.fontColor('#111827');
            Text.textAlign(TextAlign.Center);
            Text.lineHeight(22);
            Text.maxLines(3);
            Text.textOverflow({ overflow: TextOverflow.None });
            Text.margin({ top: 10 });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
