use crate::models::{ApiResponse, DeviceBindRequest, DeviceBindResponse};
use crate::services::device_service;
use crate::storage::SharedState;
use axum::extract::State;
use axum::Json;

pub async fn bind_device(
    State(state): State<SharedState>,
    Json(request): Json<DeviceBindRequest>,
) -> Json<ApiResponse<DeviceBindResponse>> {
    let Ok(mut store) = state.lock() else {
        eprintln!("[api.device.bind] state lock failed");
        return Json(ApiResponse::error("STATE_LOCK_FAILED", "服务状态暂不可用"));
    };
    let response = device_service::bind_device(&mut store, request);
    Json(ApiResponse::ok("device bound", response))
}
