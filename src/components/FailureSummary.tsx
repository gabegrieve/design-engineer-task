import type { BuildStep } from "@/types/build";
import { getStatusColors } from "@/lib/buildStatus";
import { Check, X, CircleDashed } from "lucide-react";

export interface FailureSummaryProps {
  step: BuildStep;
}

export function FailureSummary({ step }: FailureSummaryProps) {
  return (
    <section
      aria-label={`Failed step`}
      className="rounded-md border border-zinc-200/60 bg-white/50 px-2 py-1 shadow-sm mb-1"
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          <div
            className={`w-8 h-1.5 rounded-sm ${
              getStatusColors(step.status).baseColorBg
            }`}
          ></div>
        </div>
        <h4
          className={`text-sm font-medium ${
            getStatusColors(step.status).textColor
          }`}
        >
          Failure in{" "}
          <span className={getStatusColors(step.status).baseColorText}>
            {step.name}
          </span>
        </h4>
      </div>

      {/* TODO: If the step has no jobs, still surface relevant information */}

      {step.jobs && (
        <ul className="flex flex-col gap-2 my-2">
          {step.jobs.map((job) => (
            <li
              key={job.id}
              className={getStatusColors(job.status).baseColorText}
            >
              <div className="flex">
                {job.status === "complete" ? (
                  <Check className="w-4 h-4 mr-1" aria-hidden />
                ) : job.status === "failed" ? (
                  <X className="w-4 h-4 mr-1" aria-hidden />
                ) : (
                  <CircleDashed className="w-4 h-4 mr-1" aria-hidden />
                )}
                <span className="text-xs/4">
                  {job.name}
                  <span className="sr-only"> {job.status}</span>
                </span>
              </div>
              {job.status === "failed" && (
                <div
                  className={`border rounded p-2 my-2 font-mono text-xs
                    ${getStatusColors(job.status).bgColor} 
                    ${getStatusColors(job.status).borderColor}
                    ${getStatusColors(job.status).textColor} `}
                >
                  <p>
                    {job.startTime} {job.command}
                  </p>
                  <p>
                    {job.status} after {job.duration}
                  </p>
                  <p>Exit code {job.exitCode}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
