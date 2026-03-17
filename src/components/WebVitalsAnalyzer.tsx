import { useState, useEffect, useRef } from "react";
import { marked } from "marked";

type AppState = "form" | "loading" | "results";

interface AnalysisResponse {
  suggestion: string;
  [key: string]: unknown;
}

const STATUS_MESSAGES = [
  "Parsing your website source code...",
  "Checking loading performance...",
  "Reviewing Core Web Vitals...",
  "Comparing results to benchmarks...",
  "Identifying priority issues...",
  "Preparing recommendations...",
  "Finalizing your report...",
];

const COUNTDOWN_SECONDS = 60;
const MESSAGE_INTERVAL_MS = 7000;

const URL_REGEX =
  /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;

function isValidUrl(value: string): boolean {
  return URL_REGEX.test(value.trim());
}

function FormState({
  onSubmit,
}: {
  onSubmit: (url: string, contact: string) => void;
}) {
  const [url, setUrl] = useState("");
  const [contact, setContact] = useState("");
  const [urlTouched, setUrlTouched] = useState(false);

  const urlValid = isValidUrl(url);
  const canSubmit = url.trim() !== "" && contact.trim() !== "" && urlValid;
  const showError = urlTouched && url.trim() !== "" && !urlValid;

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit(url.trim(), contact.trim());
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="wva-form space-y-6">
      <div>
        <label
          htmlFor="wva-url"
          className="block text-sm font-semibold text-gray-800 mb-2">
          Website URL
        </label>
        <input
          id="wva-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => setUrlTouched(true)}
          placeholder="https://yourwebsite.com"
          className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition duration-200 font-normal bg-white
            ${
              showError
                ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-200 focus:border-secondary focus:ring-2 focus:ring-secondary/10"
            }`}
        />
        {showError && (
          <p className="text-red-500 text-xs font-medium mt-1.5">
            Please enter a valid URL (starting with http:// or https://)
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="wva-contact"
          className="block text-sm font-semibold text-gray-800 mb-2">
          Your email or WhatsApp / Telegram
        </label>
        <input
          id="wva-contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="you@example.com / @username"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition duration-200 bg-white font-normal"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full px-6 py-3.5 rounded-lg text-center font-semibold text-sm tracking-wide transition duration-300 transform
          ${
            canSubmit
              ? "bg-gradient-to-r from-secondary to-secondary/80 text-white hover:shadow-lg hover:shadow-secondary/30 hover:scale-105 cursor-pointer active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        title={
          !canSubmit ? "Fill in all fields with a valid URL to continue" : ""
        }>
        {canSubmit ? "→ Get Recommendations" : "Complete the form"}
      </button>
    </form>
  );
}

function LoadingState({ url }: { url: string }) {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const countdownId = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    const messageId = setInterval(() => {
      setMessageIndex((i) => (i + 1) % STATUS_MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);

    return () => {
      clearInterval(countdownId);
      clearInterval(messageId);
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-8">
      <p className="text-xs text-gray-400 text-center font-mono px-4 max-w-xs break-all">
        Analyzing your website. This usually takes up to 60 seconds.
      </p>

      <div className="spinner-box">
        <div className="blue-orbit leo"></div>
        <div className="green-orbit leo"></div>
        <div className="red-orbit leo"></div>
        <div className="red-orbit w1 leo"></div>
        <div className="green-orbit w2 leo"></div>
        <div className="blue-orbit w3 leo"></div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-5xl font-bold text-primary tabular-nums leading-none">
          {secondsLeft > 0 ? `${secondsLeft}s` : "✓"}
        </p>

        <p
          key={messageIndex}
          className="wva-fade-in text-gray-600 text-center text-sm font-medium px-4 max-w-sm leading-relaxed">
          {STATUS_MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
}

function ResultsState({
  markdown,
  onReset,
}: {
  markdown: string;
  onReset: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const html = marked.parse(markdown) as string;

  function handleCopy() {
    navigator.clipboard.writeText(markdown).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="wva-fade-in space-y-6">
      <div className="bg-gradient-to-r from-secondary/50 to-primary/50 border border-secondary/10 rounded-lg p-5 space-y-2 text-white">
        <p className="text-sm font-semibold">
          You can send these recommendations directly to your webmaster
        </p>
        <p className="text-xs text-gray-800 leading-relaxed">
          If you need support on the implementation side,{" "}
          <a
            href="/contact"
            className="font-semibold hover:text-primary/80 transition underline whitespace-nowrap">
            our team can help
          </a>
        </p>
      </div>

      <div
        className="prose prose-slate max-w-none rounded-lg p-7 bg-gradient-to-b from-gray-50 to-white border border-gray-100 shadow-md"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-between pt-3">
        <button
          onClick={handleCopy}
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-secondary to-secondary/80 text-white font-semibold text-sm shadow-md hover:shadow-lg transition duration-200">
          {copied ? "✓ Copied to Clipboard" : "Copy Results"}
        </button>
        <a
          href="/contact"
          className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition duration-200 text-center">
          Implement These Changes
        </a>
      </div>
    </div>
  );
}

export default function WebVitalsAnalyzer() {
  const [state, setState] = useState<AppState>("form");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [resultMarkdown, setResultMarkdown] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  async function handleFormSubmit(url: string, contact: string) {
    setSubmittedUrl(url);
    setFetchError(null);
    setState("loading");

    abortRef.current = new AbortController();

    try {
      const params = new URLSearchParams({ url, contact });
      const response = await fetch(
        `${import.meta.env.PUBLIC_BACKEND_BASE_URL}/web-tools/analyze?${params.toString()}`,
        { signal: abortRef.current.signal },
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: AnalysisResponse = await response.json();
      setResultMarkdown(data.suggestion ?? "No recommendations returned.");
      setState("results");
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setFetchError("Something went wrong. Please try again.");
      console.error("fetchError", err);
      setState("form");
    }
  }

  function handleReset() {
    abortRef.current?.abort();
    setState("form");
    setSubmittedUrl("");
    setResultMarkdown("");
    setFetchError(null);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-10 px-4 md:p-12 backdrop-blur-xl">
      {fetchError && (
        <div className="mb-6 px-5 py-4 rounded-lg bg-red-50/70 border border-red-200 text-red-700 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <span className="text-lg leading-none">⚠️</span>
            <div>
              <p className="font-semibold mb-0.5">Something went wrong</p>
              <p className="text-xs opacity-90">{fetchError}</p>
            </div>
          </div>
        </div>
      )}

      {state === "form" && <FormState onSubmit={handleFormSubmit} />}
      {state === "loading" && <LoadingState url={submittedUrl} />}
      {state === "results" && (
        <ResultsState markdown={resultMarkdown} onReset={handleReset} />
      )}
    </div>
  );
}
