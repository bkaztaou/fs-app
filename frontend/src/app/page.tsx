"use client";

import { useState } from "react";
import { api, type GreetResponse, type DbHealthResponse } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState<GreetResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [dbData, setDbData] = useState<DbHealthResponse | null>(null);
  const [dbLoading, setDbLoading] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

  const fetchGreeting = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.getGreet();
      setData(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect to the Django backend!"
      );
    } finally {
      setLoading(false);
    }
  };

  const checkDatabase = async () => {
    setDbLoading(true);
    setDbError(null);
    try {
      const response = await api.checkDb();
      setDbData(response);
    } catch (err) {
      setDbError(
        err instanceof Error ? err.message : "Failed to query the database!"
      );
    } finally {
      setDbLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-between p-8 sm:p-20 font-sans">
      <div className="flex flex-col items-center gap-4 pt-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-sm">
            <span className="text-white dark:text-black font-bold text-lg">FS</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 max-w-lg w-full">
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Full Stack Scaffolding
          </h1>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Next.js App Router wired to a Django REST backend & PostgreSQL.
          </p>
        </div>

        <ol className="w-full list-decimal list-inside text-sm text-left space-y-2.5 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 font-mono">
          <li>
            Edit{" "}
            <code className="bg-neutral-200/60 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-[13px] text-black dark:text-white">
              app/page.tsx
            </code>{" "}
            to customize this page.
          </li>
          <li>
            Test the backend and database connections using the actions below.
          </li>
        </ol>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={fetchGreeting}
            disabled={loading}
            className="flex-1 py-3 px-5 rounded-lg bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-85 active:scale-[0.98] disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-lg animate-spin" />
                <span>Contacting Django...</span>
              </>
            ) : (
              "Test Backend"
            )}
          </button>

          <button
            onClick={checkDatabase}
            disabled={dbLoading}
            className="flex-1 py-3 px-5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-transparent text-black dark:text-white font-medium text-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 active:scale-[0.98] disabled:opacity-40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
          >
            {dbLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-neutral-400 border-t-transparent rounded-lg animate-spin" />
                <span>Pinging DB...</span>
              </>
            ) : (
              "Test Database"
            )}
          </button>
        </div>

        {error && (
          <div className="w-full p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-sm font-mono">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-500 mb-1">
              Backend Connection Error
            </p>
            <p>{error}</p>
          </div>
        )}

        {dbError && (
          <div className="w-full p-4 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-sm font-mono">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-red-500 mb-1">
              Database Connection Error
            </p>
            <p>{dbError}</p>
          </div>
        )}

        {data && (
          <div className="w-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 text-left text-sm font-mono space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Backend Status
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                {data.status}
              </span>
            </div>
            
            <p className="text-neutral-800 dark:text-neutral-200">{data.message}</p>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Frontend:</span>
                <span className="text-neutral-700 dark:text-neutral-300">{data.stack.frontend}</span>
              </div>
              <div className="flex justify-between">
                <span>Backend:</span>
                <span className="text-neutral-700 dark:text-neutral-300">{data.stack.backend}</span>
              </div>
              <div className="flex justify-between">
                <span>Runtime:</span>
                <span className="text-neutral-700 dark:text-neutral-300">{data.stack.runtime}</span>
              </div>
            </div>
          </div>
        )}

        {dbData && (
          <div className="w-full p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/70 text-left text-sm font-mono space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Database Status
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                {dbData.status}
              </span>
            </div>
            
            <p className="text-neutral-800 dark:text-neutral-200">{dbData.message}</p>

            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 space-y-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex justify-between">
                <span>Engine:</span>
                <span className="text-neutral-700 dark:text-neutral-300">{dbData.database}</span>
              </div>
              {dbData.latency && (
                <div className="flex justify-between">
                  <span>Latency:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{dbData.latency}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="flex flex-wrap items-center justify-center gap-6 text-sm text-neutral-500 dark:text-neutral-400 pb-4 font-mono text-xs">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Next.js Docs &rarr;
        </a>
        <a
          href="https://docs.djangoproject.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black dark:hover:text-white transition-colors"
        >
          Django Docs &rarr;
        </a>
      </footer>
    </main>
  );
}