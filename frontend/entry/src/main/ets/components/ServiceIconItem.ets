import { PortalAction } from '../models/CampusPortal';

@Component
export struct ServiceIconItem {
  item: PortalAction = {
    id: '',
    title: '',
    subtitle: '',
    marker: '',
    route: '',
    status: 'info',
    roles: []
  };
  active: boolean = false;

  private iconResource(): Resource {
    if (this.item.id === 'my-auth-status') {
      return $r('app.media.ic_identity');
    }
    if (this.item.id === 'my-devices' || this.item.id === 'device-management' || this.item.id === 'terminal-filing') {
      return $r('app.media.ic_device');
    }
    if (this.item.id === 'my-auth-settings') {
      return $r('app.media.ic_permission');
    }
    if (this.item.id === 'my-auth-records' || this.item.id === 'class-checkin-records' || this.item.id === 'system-audit') {
      return $r('app.media.ic_record');
    }
    if (this.item.id === 'my-risk-alerts' || this.item.id === 'student-alerts' || this.item.id === 'global-risk') {
      return $r('app.media.ic_risk_alert');
    }
    if (this.item.id === 'campus-passage-status') {
      return $r('app.media.ic_campus_access');
    }
    if (this.item.id === 'class-auth-overview' || this.item.id === 'teaching-auth') {
      return $r('app.media.ic_class');
    }
    if (this.item.id === 'watch-attendance' || this.item.id === 'watch-passage') {
      return $r('app.media.ic_checkin');
    }
    if (this.item.id === 'terminal-realtime' || this.item.id === 'data-statistics') {
      return $r('app.media.ic_stats');
    }
    if (this.item.id === 'user-permission') {
      return $r('app.media.ic_user_permission');
    }
    if (this.item.id === 'risk-policy') {
      return $r('app.media.ic_policy');
    }
    if (this.item.id === 'blacklist') {
      return $r('app.media.ic_blacklist');
    }
    if (this.item.id === 'defense-demo') {
      return $r('app.media.ic_demo');
    }
    if (this.item.roles.includes('admin')) {
      return $r('app.media.ic_admin');
    }
    return $r('app.media.ic_service_default');
  }

  build() {
    Column() {
      Column() {
        Image(this.iconResource())
          .width(40)
          .height(40)
          .objectFit(ImageFit.Contain)
      }
      .width(72)
      .height(72)
      .alignItems(HorizontalAlign.Center)
      .justifyContent(FlexAlign.Center)
      .backgroundColor(this.active ? '#EAF8FC' : '#F6F6F6')
      .borderRadius(18)
      .border({
        width: this.active ? 1.5 : 0,
        color: this.active ? '#2D9CDB' : Color.Transparent
      })
      Text(this.item.title)
        .fontSize(16)
        .fontColor('#111827')
        .textAlign(TextAlign.Center)
        .lineHeight(22)
        .maxLines(3)
        .textOverflow({ overflow: TextOverflow.None })
        .margin({ top: 10 })
        .width('100%')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Center)
    .scale({ x: this.active ? 1.04 : 1, y: this.active ? 1.04 : 1 })
    .animation({ duration: 160, curve: Curve.EaseOut })
  }
}
