const REVIEW_PROMPT_LAST_SHOWN_KEY = "review_prompt_last_shown_at";
const REVIEW_PROMPT_LAST_SUBMITTED_KEY = "review_prompt_last_submitted_at";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

function readTs(key: string): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  const ts = Number(raw);
  return Number.isFinite(ts) ? ts : null;
}

export function shouldShowReviewPrompt(): boolean {
  if (typeof window === "undefined") return false;
  const now = Date.now();
  const lastShown = readTs(REVIEW_PROMPT_LAST_SHOWN_KEY);
  const lastSubmitted = readTs(REVIEW_PROMPT_LAST_SUBMITTED_KEY);
  if (lastSubmitted && now - lastSubmitted < THIRTY_DAYS_MS) return false;
  if (lastShown && now - lastShown < THIRTY_DAYS_MS) return false;
  return true;
}

export function markReviewPromptShown() {
  if (typeof window === "undefined") return;
  localStorage.setItem(REVIEW_PROMPT_LAST_SHOWN_KEY, String(Date.now()));
}

export function markReviewSubmitted() {
  if (typeof window === "undefined") return;
  const now = String(Date.now());
  localStorage.setItem(REVIEW_PROMPT_LAST_SUBMITTED_KEY, now);
  localStorage.setItem(REVIEW_PROMPT_LAST_SHOWN_KEY, now);
}
