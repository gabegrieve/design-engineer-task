import { BuildStep } from "@/types/build";
import { StepsSummary } from "./StepsSummary";
import { FailureSummary } from "./FailureSummary";

export interface BuildSummaryProps {
  buildSteps: BuildStep[];
}

export function BuildSummary({ buildSteps }: BuildSummaryProps) {
  const completeSteps = buildSteps.filter((step) => step.status === "complete");
  const failedSteps = buildSteps.filter((step) => step.status === "failed");
  const blockedSteps = buildSteps.filter((step) => step.status === "pending");

  return (
    <div>
      <StepsSummary status="complete" steps={completeSteps} />
      {failedSteps?.map((step) => (
        <FailureSummary key={step.id} step={step} />
      ))}
      <StepsSummary status="pending" steps={blockedSteps} label="Blocked" />
    </div>
  );
}
