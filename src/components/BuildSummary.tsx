import { BuildStep } from "@/types/build";
import { StatusSummary } from "./StatusSummary";
import { FailureSummary } from "./FailureSummary";

export interface BuildSummaryProps {
  buildSteps: BuildStep[];
}

export function BuildSummary({ buildSteps }: BuildSummaryProps) {
  const completeSteps = buildSteps.filter((step) => step.status === "complete");
  const failedSteps = buildSteps.filter((step) => step.status === "failed");
  const pendingSteps = buildSteps.filter((step) => step.status === "pending");

  return (
    <div>
      <StatusSummary status="complete" steps={completeSteps} />
      {failedSteps?.map((step) => (
        <FailureSummary key={step.id} step={step} />
      ))}
      <StatusSummary status="pending" steps={pendingSteps} />
    </div>
  );
}
