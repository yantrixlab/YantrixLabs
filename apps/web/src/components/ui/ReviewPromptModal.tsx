"use client";

import { useMemo, useState } from "react";
import { Star, X } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useToast } from "./Toast";

interface ReviewPromptModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitted: () => void;
}

export function ReviewPromptModal({
  open,
  onClose,
  onSubmitted,
}: ReviewPromptModalProps) {
  const { success, error: toastError } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);

  const commentLength = useMemo(() => comment.trim().length, [comment]);

  if (!open) return null;

  const submit = async () => {
    if (commentLength < 10) {
      toastError("Add more detail", "Please write at least 10 characters.");
      return;
    }
    setSaving(true);
    try {
      await apiFetch("/reviews", {
        method: "POST",
        body: JSON.stringify({ rating, comment: comment.trim() }),
      });
      success("Thanks for your review", "We will publish it after approval.");
      onSubmitted();
      onClose();
    } catch (err: any) {
      toastError("Could not submit review", err?.message || "Try again later.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10020] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900">
          How was your invoicing experience?
        </h3>
        <p className="mt-1 text-sm text-gray-600">
          Your feedback helps us improve the product.
        </p>

        <div className="mt-4 flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => {
            const val = i + 1;
            const active = val <= rating;
            return (
              <button
                key={val}
                type="button"
                onClick={() => setRating(val)}
                className="rounded-md p-1"
                aria-label={`Rate ${val} star${val > 1 ? "s" : ""}`}
              >
                <Star
                  className={`h-6 w-6 ${
                    active ? "fill-amber-400 text-amber-400" : "text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-xs font-semibold text-gray-600">
            Tell us what worked well
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            maxLength={600}
            placeholder="Example: The invoice flow is fast and easy to use..."
            className="w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none"
          />
          <p className="mt-1 text-xs text-gray-400">{commentLength}/600</p>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Maybe later
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
          >
            {saving ? "Submitting..." : "Submit review"}
          </button>
        </div>
      </div>
    </div>
  );
}
