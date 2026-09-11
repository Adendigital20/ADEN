"use client";

import { useTransition } from "react";
import { toggleVideoProgress } from "./actions";

export default function ProgressCheckbox({ videoId, initialCompleted }: { videoId: string, initialCompleted: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        defaultChecked={initialCompleted}
        disabled={isPending}
        onChange={(e) => {
          const checked = e.target.checked;
          startTransition(async () => {
            await toggleVideoProgress(videoId, checked);
          });
        }}
        className="w-5 h-5 text-[#25D366] rounded focus:ring-[#25D366]"
      />
      <span className="text-sm font-medium text-gray-700">
        {isPending ? "Sauvegarde..." : "Marquer comme terminé"}
      </span>
    </label>
  );
}
