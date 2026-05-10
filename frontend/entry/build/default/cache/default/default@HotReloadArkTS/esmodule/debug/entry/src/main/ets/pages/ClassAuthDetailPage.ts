if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ClassAuthDetailPage_Params {
    state?: PageLoadState;
    detail?: ClassAuthDetail;
}
import router from "@ohos:router";
import { PageTitleBar } from "@bundle:com.example.campusauth/entry/ets/components/PageTitleBar";
import type { ClassAuthDetail, PageLoadState, StudentAuthRecord } from '../models/CampusPortal';
import { PortalMockService } from "@bundle:com.example.campusauth/entry/ets/services/PortalMockService";
import { AppColors, AppLayout, AppRoutes } from "@bundle:com.example.campusauth/entry/ets/utils/Constants";
import { PermissionUtil } from "@bundle:com.example.campusauth/entry/ets/utils/PermissionUtil";
interface ClassAuthRouteParams {
    classId?: string;
}
class ClassAuthDetailPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__state = new ObservedPropertySimplePU('loading', this, "state");
        this.__detail = new ObservedPropertyObjectPU(PortalMockService.classAuthDetail('tc1'), this, "detail");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ClassAuthDetailPage_Params) {
        if (params.state !== undefined) {
            this.state = params.state;
        }
        if (params.detail !== undefined) {
            this.detail = params.detail;
        }
    }
    updateStateVars(params: ClassAuthDetailPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__state.purgeDependencyOnElmtId(rmElmtId);
        this.__detail.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__state.aboutToBeDeleted();
        this.__detail.aboutToBeDeleted();
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
    private __detail: ObservedPropertyObjectPU<ClassAuthDetail>;
    get detail() {
        return this.__detail.get();
    }
    set detail(newValue: ClassAuthDetail) {
        this.__detail.set(newValue);
    }
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
    StatItem(label: string, value: string, color: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(21);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(color);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
        }, Text);
        Text.pop();
        Column.pop();
    }
    StatCard(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.padding(18);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(14);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('认证统计');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`最近 ${this.detail.latestTime}`);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.StatItem.bind(this)('应到人数', `${this.detail.totalCount}`, AppColors.text);
        this.StatItem.bind(this)('已认证', `${this.detail.signedCount}`, '#16A34A');
        this.StatItem.bind(this)('未认证', `${this.detail.unsignedCount}`, AppColors.muted);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.StatItem.bind(this)('异常人数', `${this.detail.abnormalCount}`, '#EF4444');
        this.StatItem.bind(this)('完成率', `${this.detail.rate}%`, AppColors.primary);
        this.StatItem.bind(this)('最近认证', this.detail.latestTime, AppColors.text);
        Row.pop();
        Column.pop();
    }
    StatusTag(text: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.fontSize(12);
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor(this.statusColor(text));
            Text.padding({ left: 10, right: 10, top: 5, bottom: 5 });
            Text.backgroundColor(this.statusBg(text));
            Text.borderRadius(12);
        }, Text);
        Text.pop();
    }
    StudentRecordCard(record: StudentAuthRecord, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor(AppColors.surface);
            Column.borderRadius(14);
            Column.border({ width: 1, color: AppColors.border });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.name);
            Text.fontSize(17);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`学号：${record.studentNo}`);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
        }, Text);
        Text.pop();
        Column.pop();
        this.StatusTag.bind(this)(record.status);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`时间：${record.authTime}`);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`设备：${record.device}`);
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 8 });
            Row.border({ width: { top: 1 }, color: AppColors.border });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('风险等级');
            Text.fontSize(12);
            Text.fontColor(AppColors.muted);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.riskLevel);
            Text.fontSize(13);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(this.riskColor(record.riskLevel));
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
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
                    let componentCall = new PageTitleBar(this, { title: '班级认证详情', subtitle: this.detail.className }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ClassAuthDetailPage.ets", line: 179, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '班级认证详情',
                            subtitle: this.detail.className
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PageTitleBar" });
        }
        this.StatCard.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('学生认证明细');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor(AppColors.text);
            Text.width('100%');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.state === 'empty') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 8 });
                        Column.width('100%');
                        Column.height(104);
                        Column.justifyContent(FlexAlign.Center);
                        Column.backgroundColor(AppColors.surface);
                        Column.borderRadius(14);
                        Column.border({ width: 1, color: AppColors.border });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无学生认证明细');
                        Text.fontSize(14);
                        Text.fontColor(AppColors.muted);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const record = _item;
                            this.StudentRecordCard.bind(this)(record);
                        };
                        this.forEachUpdateFunction(elmtId, this.detail.students, forEachItemGenFunction, (record: StudentAuthRecord): string => record.id, false, false);
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
        return "ClassAuthDetailPage";
    }
}
registerNamedRoute(() => new ClassAuthDetailPage(undefined, {}), "", { bundleName: "com.example.campusauth", moduleName: "entry", pagePath: "pages/ClassAuthDetailPage", pageFullPath: "entry/src/main/ets/pages/ClassAuthDetailPage", integratedHsp: "false", moduleType: "followWithHap" });
