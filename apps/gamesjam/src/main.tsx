import "./styles.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { startI18n } from "./i18n";
import { AppRouter } from "./app/router";
import { audio } from "./shell/AudioManager";

startI18n();
audio.init();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
);
