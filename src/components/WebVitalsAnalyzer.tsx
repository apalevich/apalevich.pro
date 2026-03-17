import { useState, useEffect, useRef } from "react";
import { marked } from "marked";

type AppState = "form" | "loading" | "results";

interface AnalysisResponse {
  suggestion: string;
  [key: string]: unknown;
}

const STATUS_MESSAGES = [
  "Fetching your website's source code...",
  "Analyzing loading performance...",
  "Running Core Web Vitals tests...",
  "Comparing against industry benchmarks...",
  "Generating personalized recommendations...",
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
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-5">
        <label
          htmlFor="wva-url"
          className="block text-sm font-medium text-gray-700 mb-1">
          Your website URL
        </label>
        <input
          id="wva-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={() => setUrlTouched(true)}
          placeholder="https://example.com"
          className={`w-full px-4 py-3 border-2 rounded-md outline-none focus:ring-4 ring-gray-100 transition
            ${
              showError
                ? "border-red-400 focus:border-red-500"
                : "border-gray-300 focus:border-secondary"
            }`}
        />
        {showError && (
          <p className="text-red-400 text-sm mt-1">
            Please enter a valid URL (e.g. example.com or https://example.com).
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="wva-contact"
          className="block text-sm font-medium text-gray-700 mb-1">
          Your email or messenger handle
        </label>
        <input
          id="wva-contact"
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="you@example.com or @yourhandle"
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-md outline-none focus:ring-4 ring-gray-100 focus:border-secondary transition"
        />
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full px-6 py-3 rounded text-center font-medium transition
          ${
            canSubmit
              ? "bg-secondary text-white hover:bg-secondary-600 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}>
        Analyze My Website
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
    <div className="flex flex-col items-center py-10 gap-6">
      <p
        key={messageIndex}
        className="wva-fade-in text-slate-600 text-center text-base max-w-xs">
        {STATUS_MESSAGES[messageIndex]}
      </p>

      <div className="spinner-box">
        <div className="blue-orbit leo"></div>

        <div className="green-orbit leo"></div>

        <div className="red-orbit leo"></div>

        <div className="red-orbit w1 leo"></div>
        <div className="green-orbit w2 leo"></div>
        <div className="blue-orbit w3 leo"></div>
      </div>

      <p className="text-4xl font-bold text-primary tabular-nums">
        {secondsLeft > 0 ? secondsLeft + "s" : "A little more..."}
      </p>

      <p className="text-xs text-slate-400 text-center">
        Analyzing: <span className="font-mono">{url}</span>
      </p>
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
    <div className="wva-fade-in">
      <p className="text-slate-600 mb-6 text-center">
        These results have been sent to your webmaster.{" "}
        <strong>No webmaster?</strong> We're ready to implement these
        improvements.{" "}
        <a
          href="/contact"
          className="text-secondary underline hover:text-secondary-400 transition">
          Get in touch.
        </a>
      </p>

      <div
        className="prose prose-slate max-w-none border border-gray-100 rounded-lg p-6 bg-white shadow-sm"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div className="flex flex-col gap-3 mt-6 justify-end">
        <button
          onClick={handleCopy}
          className="px-4 py-2 rounded border-2 border-secondary text-white bg-secondary transition text-sm font-medium">
          {copied ? "Copied!" : "Copy Results"}
        </button>
        <button
          onClick={onReset}
          className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100 transition text-sm font-medium">
          Analyze Another Site
        </button>
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
        // `https://apalevich.com/backend/web-tools/analyze?${params.toString()}`,
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
    <div className="bg-white rounded-xl shadow-md p-8">
      {fetchError && (
        <div className="mb-4 px-4 py-3 rounded bg-red-50 border border-red-200 text-red-700 text-sm">
          {fetchError}
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
