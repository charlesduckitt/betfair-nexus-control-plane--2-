import React, { useState } from "react";
import {
  Activity,
  Database,
  Settings,
  FileText,
  Menu,
  Cpu,
  Cloud,
  Globe,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { icon: Activity, label: "Live Dashboard", path: "/" },
    { icon: Settings, label: "Configuration", path: "/settings" },
    { icon: FileText, label: "User Manual", path: "/docs" },
  ];

  const NavContent = () => (
    <>
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-neon-blue flex items-center justify-center shadow-lg shadow-neon-blue/20">
            <Cpu className="text-white h-5 w-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">
              Betfair Nexus
            </h1>
            <span className="text-xs text-slate-500 font-mono">
              v2.4.0-alpha
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-400 uppercase font-semibold">
              System Health
            </span>
            <div className="h-2 w-2 rounded-full bg-neon-green animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Cloud className="h-3 w-3" /> Cloudflare Workers
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Database className="h-3 w-3" /> BigQuery Write API
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Globe className="h-3 w-3" /> Betfair API
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200">
      {/* Top copyright banner */}
      <div className="fixed inset-x-0 top-0 h-8 bg-slate-900/80 border-b border-slate-800 z-50 flex items-center justify-center">
        <span className="text-xs text-slate-400">
          © Ascot Wealth Management. All rights reserved.
        </span>
      </div>
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 hidden md:flex flex-col">
        <NavContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="relative w-72 bg-slate-950 h-full border-r border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <NavContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative pt-8">
        <header className="h-16 border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 -ml-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="font-bold">Betfair Nexus</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs border border-emerald-500/20 font-mono">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors border border-slate-700">
              Refresh State
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple border border-white/10" />
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-slate-950 p-6">
          <div className="max-w-7xl mx-auto space-y-6">{children}</div>
        </div>
      </main>
    </div>
  );
};
