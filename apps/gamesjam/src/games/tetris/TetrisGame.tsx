import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Phaser from "phaser";
import { PlayScene, type ScoreUpdate } from "./scene/PlayScene";
import { audio } from "../../shell/AudioManager";
import { TETRIS_BGM, TETRIS_SFX } from "./scene/audio";
import { useSettings } from "../../shell/SettingsStore";
import { useScores } from "../../shell/ScoreStore";
import { useWakeLock } from "../../shell/useWakeLock";
import { TouchHUD } from "./TouchHUD";
import { type Locale, isLocale } from "../../i18n/locales";

export default function TetrisGame() {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const locale: Locale = isLocale(params.locale) ? params.locale : "en";
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<PlayScene | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const showTouchHud = useSettings((s) => s.showTouchHud);
  const submitBest = useScores((s) => s.submit);
  const getBest = useScores((s) => s.getBest);

  const [hud, setHud] = useState<ScoreUpdate>({ score: 0, best: getBest("tetris"), level: 1, lines: 0 });
  const [phase, setPhase] = useState<"playing" | "paused" | "over">("playing");
  const [newBest, setNewBest] = useState(false);

  useWakeLock(phase === "playing");

  useEffect(() => {
    audio.loadSfx(TETRIS_SFX.map((s) => ({ key: s.key, src: s.src })));
    audio.loadBgm(TETRIS_BGM.map((b) => ({ key: b.key, src: b.src })));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new PlayScene();
    sceneRef.current = scene;

    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: containerRef.current,
      backgroundColor: "#0f0f1a",
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      input: { keyboard: true, touch: true },
      scene: [],
    });
    gameRef.current = game;

    game.scene.add("PlayScene", scene, true, {
      onScore: (s: ScoreUpdate) => setHud(s),
      onGameOver: (final: ScoreUpdate, isNewBest: boolean) => {
        setHud(final);
        setNewBest(isNewBest);
      },
      onState: (p: "playing" | "paused" | "over") => setPhase(p),
      getBest: () => getBest("tetris"),
      submitBest: (score: number) => submitBest("tetris", score),
    });

    return () => {
      game.destroy(true);
      gameRef.current = null;
      sceneRef.current = null;
    };
  }, [getBest, submitBest]);

  useEffect(() => {
    const onVis = () => {
      if (document.hidden && phase === "playing") {
        sceneRef.current?.command("pause");
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [phase]);

  const send = (cmd: Parameters<PlayScene["command"]>[0]) => sceneRef.current?.command(cmd);

  return (
    <div className="flex-1 relative flex flex-col overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2 text-sm bg-jam-surface/60 border-b border-jam-border">
        <Stat label={t("tetrisHud.score")} value={hud.score} />
        <Stat label={t("tetrisHud.best")} value={hud.best} />
        <Stat label={t("tetrisHud.level")} value={hud.level} />
        <Stat label={t("tetrisHud.lines")} value={hud.lines} />
        <button
          type="button"
          onClick={() => send(phase === "playing" ? "pause" : "resume")}
          className="px-3 py-1 rounded-md bg-jam-surface-2 hover:bg-jam-surface text-xs"
          aria-label={t("controls.pause")}
        >
          {phase === "playing" ? "II" : "▶"}
        </button>
      </div>

      <div ref={containerRef} className="flex-1 relative" />

      {showTouchHud && phase !== "over" && (
        <TouchHUD onCommand={(c) => send(c)} />
      )}

      {phase === "paused" && (
        <Overlay title={t("overlay.paused")}>
          <OverlayBtn onClick={() => send("resume")}>{t("overlay.resume")}</OverlayBtn>
          <OverlayBtn onClick={() => send("restart")}>{t("overlay.restart")}</OverlayBtn>
          <OverlayBtn onClick={() => navigate(`/${locale}`)}>{t("overlay.quit")}</OverlayBtn>
        </Overlay>
      )}
      {phase === "over" && (
        <Overlay
          title={t("overlay.gameOver")}
          subtitle={newBest ? t("overlay.newBest") : `${t("tetrisHud.score")}: ${hud.score}`}
        >
          <OverlayBtn onClick={() => { setNewBest(false); send("restart"); }}>
            {t("overlay.tryAgain")}
          </OverlayBtn>
          <OverlayBtn onClick={() => navigate(`/${locale}`)}>{t("overlay.quit")}</OverlayBtn>
        </Overlay>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col leading-tight">
      <span className="text-[10px] uppercase tracking-wider text-jam-muted">{label}</span>
      <span className="font-bold tabular-nums">{value}</span>
    </div>
  );
}

function Overlay({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 bg-black/70 z-30 grid place-items-center px-6">
      <div className="bg-jam-surface border border-jam-border rounded-2xl p-6 max-w-xs w-full text-center flex flex-col gap-3">
        <h3 className="text-xl font-bold">{title}</h3>
        {subtitle && <p className="text-jam-muted">{subtitle}</p>}
        <div className="flex flex-col gap-2 mt-2">{children}</div>
      </div>
    </div>
  );
}

function OverlayBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full px-4 py-2.5 rounded-lg bg-jam-primary text-jam-bg font-medium hover:bg-jam-primary-hover transition"
    >
      {children}
    </button>
  );
}
