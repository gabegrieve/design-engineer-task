import { BuildStep, StepStatus } from "@/types/build";
import { getStatusColors, getStatusLabel } from "@/lib/buildStatus";

export interface StatusSummaryProps {
  steps: BuildStep[];
  status: StepStatus;
}

export function StatusSummary({ status, steps }: StatusSummaryProps) {
  if (!steps || steps.length === 0) return null;

  const statusColors = getStatusColors(status);

  return (
    <section
      aria-label={`${getStatusLabel(status)} steps`}
      className="rounded-md border border-zinc-200/60 bg-white/50 px-2 py-1 shadow-sm mb-1"
    >
      <div className="flex gap-2 items-center">
        <div className="flex gap-1 items-center">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`w-8 h-1.5 rounded-sm ${statusColors.baseColorBg}`}
              aria-label={`${step.status} step`}
            ></div>
          ))}
        </div>
        <h4 className={`text-sm font-medium ${statusColors.textColor}`}>
          {steps.length} {steps.length === 1 ? "Step" : "Steps"}{" "}
          {getStatusLabel(status)}
        </h4>
        <ul className="flex">
          {steps.map((step) => (
            <li
              className="text-xs/4 px-1 border-r last:border-r-0 border-zinc-200/60 text-zinc-400"
              key={step.id}
            >
              {step.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
