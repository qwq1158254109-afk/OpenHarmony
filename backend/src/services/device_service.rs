use crate::models::{Device, DeviceBindRequest, DeviceBindResponse, DeviceTrustLevel};
use crate::storage::AppStore;
use uuid::Uuid;

pub fn bind_device(store: &mut AppStore, request: DeviceBindRequest) -> DeviceBindResponse {
    let device = Device {
        id: Uuid::new_v4().to_string(),
        user_id: request.user_id,
        name: request.device_name,
        device_type: request.device_type,
        trusted: request.trusted,
        trust_score: if request.trusted { 82 } else { 52 },
        trust_level: if request.trusted {
            DeviceTrustLevel::High
        } else {
            DeviceTrustLevel::Medium
        },
        online: true,
        last_seen: "刚刚".to_string(),
    };
    store.devices.insert(0, device.clone());
    println!(
        "[device.bind] user_id={}, device={}, trusted={}",
        device.user_id, device.name, device.trusted
    );
    DeviceBindResponse {
        success: true,
        message: "device bound".to_string(),
        device,
    }
}
