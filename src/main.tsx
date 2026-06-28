import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

// Global error handler to catch and display client-side runtime crashes
window.addEventListener("error", (event) => {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="padding: 24px; background: #1a0f0f; color: #f87171; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; border: 1px solid #7f1d1d; border-radius: 12px; max-width: 800px; margin: 40px auto; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
        <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #ef4444;">Runtime Crash Detected</h1>
        <p style="margin-bottom: 8px;"><strong>Error:</strong> ${event.message}</p>
        <p style="margin-bottom: 16px; font-size: 14px; color: #fca5a5;"><strong>Source:</strong> ${event.filename}:${event.lineno}:${event.colno}</p>
        <pre style="background: #0f0505; padding: 16px; border-radius: 8px; overflow-x: auto; font-size: 13px; line-height: 1.6; border: 1px solid #450a0a;">${event.error?.stack || 'No stack trace available'}</pre>
        <button onclick="window.location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
});

window.addEventListener("unhandledrejection", (event) => {
  const rootEl = document.getElementById("root");
  if (rootEl) {
    rootEl.innerHTML = `
      <div style="padding: 24px; background: #1a0f0f; color: #f87171; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; border: 1px solid #7f1d1d; border-radius: 12px; max-width: 800px; margin: 40px auto; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);">
        <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #ef4444;">Unhandled Rejection</h1>
        <p style="margin-bottom: 8px;"><strong>Reason:</strong> ${event.reason}</p>
        <button onclick="window.location.reload()" style="margin-top: 16px; padding: 8px 16px; background: #ef4444; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Reload Page</button>
      </div>
    `;
  }
});

createRoot(document.getElementById("root")!).render(<App />);