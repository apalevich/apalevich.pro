const TOKENS: Record<string, string> = {
  "{br}": "<br>",
  "{br-xs}": '<br class="hidden xs:block">',
  "{br-sm}": '<br class="hidden sm:block">',
  "{br-md}": '<br class="hidden md:block">',
  "{br-lg}": '<br class="hidden lg:block">',
  "{br-xl}": '<br class="hidden xl:block">',
  "{br-2xl}": '<br class="hidden 2xl:block">',
  "{br-below-sm}": '<br class="block sm:hidden">',
  "{br-below-md}": '<br class="block md:hidden">',
  "{br-below-lg}": '<br class="block lg:hidden">',
  "{br-below-xl}": '<br class="block xl:hidden">',
  "{br-below-2xl}": '<br class="block 2xl:hidden">',
  "{br-only-xs}": '<br class="hidden xs:block smxs:hidden">',
  "{br-only-sm}": '<br class="hidden sm:block md:hidden">',
  "{br-only-md}": '<br class="hidden md:block lg:hidden">',
  "{br-only-lg}": '<br class="hidden lg:block xl:hidden">',
  "{br-only-xl}": '<br class="hidden xl:block">',
  "{br-only-2xl}": '<br class="hidden 2xl:block">',
  "{nbsp}": "&nbsp;",
};

const TOKEN_RE = new RegExp(
  Object.keys(TOKENS)
    .map((t) => t.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&"))
    .join("|"),
  "g",
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
