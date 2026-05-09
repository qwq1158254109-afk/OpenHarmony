mod models;
mod routes;
mod services;
mod storage;

use axum::routing::{get, post};
use axum::{Json, Router};
use routes::auth_routes::{get_records, login, verify_auth};
use routes::device_routes::bind_device;
use routes::risk_routes::{risk_logs, score_risk};
use serde::Serialize;
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;

#[derive(Serialize)]
struct ServiceInfo {
    name: &'static str,
    status: &'static str,
    endpoints: [&'static str; 6],
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
        .route("/api/auth/verify", post(verify_auth))
        .route("/api/auth/records", get(get_records))
        .route("/api/device/bind", post(bind_device))
        .route("/api/risk/score", get(score_risk))
        .route("/api/risk/logs", get(risk_logs))
        .layer(CorsLayer::permissive())
        .with_state(state);

    let addr = SocketAddr::from(([127, 0, 0, 1], 8080));
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
        endpoints: [
            "POST /api/login",
            "POST /api/auth/verify",
            "GET /api/auth/records",
            "POST /api/device/bind",
            "GET /api/risk/score",
            "GET /api/risk/logs",
        ],
    })
}

async fn health() -> Json<HealthResponse> {
    Json(HealthResponse { status: "ok" })
}
