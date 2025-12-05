import React, { useEffect, useRef, useState } from "react";
import { LogEntry } from "../types";

interface TerminalLogProps {
  logs: LogEntry[];
}

export const TerminalLog: React.FC<TerminalLogProps> = ({ logs }) => {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef(true);
  const [autoScroll, setAutoScroll] = useState(true);

  // Keep autoScrollRef in sync with state for use inside effects
  useEffect(() => {
    autoScrollRef.current = autoScroll;
  }, [autoScroll]);

  // Scroll to bottom only when autoScroll is enabled (user at bottom or explicit)
  useEffect(() => {
    const el = containerRef.current;
    // determine if the user is at (or near) the bottom right now
    const atBottom = el
      ? el.scrollTop + el.clientHeight >= el.scrollHeight - 20
      : true;
    if (autoScrollRef.current || atBottom) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Track user scrolling to disable auto-scroll when they scroll up
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 20;
      if (atBottom) {
        setAutoScroll(true);
      } else {
        setAutoScroll(false);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    // initialize
    onScroll();

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const getLevelColor = (level: LogEntry["level"]) => {
    switch (level) {
      case "INFO":
        return "text-slate-400";
      case "WARN":
        return "text-neon-amber";
      case "ERROR":
        return "text-neon-red";
      case "SUCCESS":
        return "text-neon-green";
      default:
        return "text-slate-200";
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-96 font-mono text-xs">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex justify-between items-center">
        <span className="text-slate-400 font-medium">Agent Logs</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
      </div>
      <div
        className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-thin"
        ref={containerRef}
      >
        <div className="flex items-center justify-end mb-2">
          <button
            onClick={() => setAutoScroll((s) => !s)}
            className={`text-xs px-2 py-0.5 rounded text-slate-300/80 bg-slate-900/30 border border-slate-800 hover:bg-slate-900/50 transition-colors ${
              autoScroll ? "ring-1 ring-neon-cyan/20" : ""
            }`}
          >
            {autoScroll ? "Tailing" : "Paused"}
          </button>
        </div>
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex gap-3 hover:bg-slate-900/50 p-0.5 rounded"
          >
            <span className="text-slate-600 shrink-0">
              {log.timestamp.toLocaleTimeString("en-US", {
                hour12: false,
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
              .{log.timestamp.getMilliseconds().toString().padStart(3, "0")}
            </span>
            <span
              className={`font-bold w-16 shrink-0 ${getLevelColor(log.level)}`}
            >
              {log.level}
            </span>
            <span className="text-slate-500 w-32 shrink-0 truncate">
              [{log.agent.replace(" Agent", "")}]
            </span>
            <span className="text-slate-300 break-all">{log.message}</span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
};
