import React from 'react';
import { Save, Lock, Database, AlertTriangle } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Configuration</h2>
        <p className="text-slate-400">Manage API keys, environment secrets, and BigQuery connection settings.</p>
      </div>

      {/* Betfair Credentials */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-800 rounded-lg">
                <Lock className="h-5 w-5 text-neon-amber" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">Betfair API Credentials</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Application Key</label>
                <input 
                    type="password" 
                    defaultValue="****************"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Application Secret</label>
                <input 
                    type="password" 
                    defaultValue="****************"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all"
                />
            </div>
        </div>
        <div className="mt-4 p-3 bg-neon-amber/5 border border-neon-amber/10 rounded-lg flex gap-3 items-start">
            <AlertTriangle className="h-5 w-5 text-neon-amber shrink-0 mt-0.5" />
            <p className="text-xs text-neon-amber/80">
                Credentials are encrypted and stored securely in Cloudflare KV. They are never exposed to the client-side bundle. 
                Updating these values will trigger a secure secret rotation in the Worker environment.
            </p>
        </div>
      </section>

      {/* BigQuery Settings */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-slate-800 rounded-lg">
                <Database className="h-5 w-5 text-emerald-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-200">BigQuery Target</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">GCP Project ID</label>
                <input 
                    type="text" 
                    defaultValue="betfair-analytics-prod"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Dataset Name</label>
                <input 
                    type="text" 
                    defaultValue="racing_uk_ie_win"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
            </div>
        </div>
      </section>

      <div className="flex justify-end pt-4">
        <button className="flex items-center gap-2 px-6 py-3 bg-neon-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg shadow-neon-blue/20">
            <Save className="h-4 w-4" /> Save Changes
        </button>
      </div>
    </div>
  );
};