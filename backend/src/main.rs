mod models;
mod routes;
mod services;
mod storage;

use axum::routing::{get, post};
use axum::{Json, Router};
use routes::auth_routes::{get_records, login, register, verify_auth};
use routes::campus_routes::{
    access_rules, add_blacklist, admin_attendance, auth_permissions, blacklist, list_devices,
    passage_records, register_terminal, remove_blacklist, student_certifications,
    terminal_realtime_events, terminals, update_access_rule, update_auth_permission,
    verify_student,
};
use routes::device_routes::bind_device;
use routes::risk_routes::{risk_logs, score_risk};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

#[derive(Serialize)]
struct ServiceInfo {
    name: &'static str,
    status: &'static str,
    endpoints: Vec<&'static str>,
}

#[derive(Serialize)]
struct HealthResponse {
    status: &'static str,
}

#[tokio::main]
async fn main() {
    let state = storage::new_shared_state();
    let app = Router::new()
        .route("/", get(service_info))
        .route("/health", get(health))
        .route("/api/login", post(login))
        .route("/api/auth/register", post(register))
        .route("/api/auth/verify", post(verify_auth))
        .route("/api/auth/records", get(get_records))
        .route("/api/device/bind", post(bind_device))
        .route("/api/risk/score", get(score_risk))
        .route("/api/risk/logs", get(risk_logs))
        .route("/api/student/certifications", get(student_certifications))
        .route("/api/student/verify", post(verify_student))
        .route("/api/devices", get(list_devices))
        .route("/api/auth/permissions", get(auth_permissions))
        .route("/api/auth/permissions/update", post(update_auth_permission))
        .route("/api/passage/records", get(passage_records))
        .route("/api/terminals", get(terminals))
        .route("/api/terminals/register", post(register_terminal))
        .route(
            "/api/terminals/realtime-auth",
            get(terminal_realtime_events),
        )
        .route("/api/admin/attendance", get(admin_attendance))
        .route("/api/admin/blacklist", get(blacklist))
        .route("/api/admin/blacklist/add", post(add_blacklist))
        .route("/api/admin/blacklist/remove", post(remove_blacklist))
        .route("/api/admin/access-rules", get(access_rules))
        .route("/api/admin/access-rules/update", post(update_access_rule))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .expect("failed to bind backend listener");
    println!("Campus auth backend listening on http://{addr}");
    axum::serve(listener, app)
        .await
        .expect("backend server stopped unexpectedly");
}

async fn service_info() -> Json<ServiceInfo> {
    Json(ServiceInfo {
        name: "campus-distributed-auth-backend",
        status: "ok",
        endpoints: vec![
            "POST /api/login",
            "POST /api/auth/register",
            "POST /api/auth/verify",
            "GET /api/auth/records",
            "POST /api/device/bind",
            "GET /api/risk/score",
            "GET /api/risk/logs",
            "GET /api/student/certifications",
            "POST /api/student/verify",
            "GET /api/devices",
            "GET /api/auth/permissions",
            "POST /api/auth/permissions/update",
            "GET /api/passage/records",
            "GET /api/terminals",
            "POST /api/terminals/register",
            "GET /api/terminals/realtime-auth",
            "GET /api/admin/attendance",
            "GET /api/admin/blacklist",
            "POST /api/admin/blacklist/add",
            "POST /api/admin/blacklist/remove",
            "GET /api/admin/access-rules",
            "POST /api/admin/access-rules/update",
        ],
    })
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse { status: "ok" })
}
