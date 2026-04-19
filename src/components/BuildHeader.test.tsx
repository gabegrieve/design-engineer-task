import { render, screen } from "@testing-library/react";
import BuildHeader from "./BuildHeader";
import { mockBuildSteps } from "@/data/mockBuildSteps";

test("renders content", () => {
  render(
    <BuildHeader
      pipelineName="api-backend"
      buildNumber="17532"
      branch="main"
      pullRequest={{
        number: 4821,
        title: "Harden auth token validation for Node 20",
        triggeredAt: "Today at 1:49 PM",
        author: { name: "Alex Rivera" },
      }}
      buildSteps={mockBuildSteps}
      status="failed"
    />
  );

  const element = screen.getByText("Harden auth token validation for Node 20");
  expect(element).toBeDefined();
});
