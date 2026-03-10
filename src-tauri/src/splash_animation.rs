use tauri::Manager;
use tokio::time::{sleep, Duration};

pub struct SplashStartup {
    main: tauri::WebviewWindow,
    splash: tauri::WebviewWindow,
}

impl SplashStartup {
    pub fn begin(app: &tauri::AppHandle) -> Self {
        let main = app.get_webview_window("main").unwrap();
        main.hide().unwrap();
        let splash: tauri::WebviewWindow = tauri::WebviewWindowBuilder::new(
            app,
            "splash",
            tauri::WebviewUrl::App("splash.html".into())
        )
        .title("Loading...")
        .inner_size(300.0, 300.0)
        .center()
        .decorations(false)
        .transparent(true)
        .shadow(false)
        .always_on_top(true)
        .build()
        .unwrap();

        Self { main, splash }
    }

    pub fn end(self) {
        let main = self.main;
        let splash = self.splash;
        tauri::async_runtime::spawn(async move {
            sleep(Duration::from_secs(7)).await;
            splash.close().unwrap();
            main.show().unwrap()
        });
    } 
}