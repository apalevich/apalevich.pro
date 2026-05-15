const TOKENS: Record<string, string> = {
  "{br}": "<br>",
  "{br-sm}": '<br class="hidden sm:inline">',
  "{br-md}": '<br class="hidden md:inline">',
  "{br-lg}": '<br class="hidden lg:inline">',
  "{br-xl}": '<br class="hidden xl:inline">',
  "{br-below-sm}": '<br class="inline sm:hidden">',
  "{br-below-md}": '<br class="inline md:hidden">',
  "{br-below-lg}": '<br class="inline lg:hidden">',
  "{br-below-xl}": '<br class="inline xl:hidden">',
  "{br-only-sm}": '<br class="hidden sm:inline md:hidden">',
  "{br-only-md}": '<br class="hidden md:inline lg:hidden">',
  "{br-only-lg}": '<br class="hidden lg:inline xl:hidden">',
  "{br-only-xl}": '<br class="hidden xl:inline">',
  "{nbsp}": "&nbsp;",
};

const TOKEN_RE = new RegExp(
  Object.keys(TOKENS)
    .map((t) => t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join("|"),
  "g"
);

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderCopy(value: string | undefined | null): string {
  if (value == null) return "";
  if (typeof value !== "string") return String(value);
  return escapeHtml(value).replace(TOKEN_RE, (match) => TOKENS[match] ?? match);
}

export function renderCopyList(values: readonly string[]): string[] {
  return values.map((v) => renderCopy(v));
}
