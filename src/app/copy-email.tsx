"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : `Copy ${email} to clipboard`}
      className="text-sm text-neutral-900 bg-neutral-100 border border-neutral-200 rounded-md px-2 py-1 font-mono inline-flex items-center gap-2 hover:bg-neutral-200 transition-colors"
    >
      <span>{email}</span>
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 text-green-600" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5 text-neutral-500" />
      )}
    </button>
  );
}
