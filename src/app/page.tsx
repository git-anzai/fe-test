import { FlowPanelsApp } from "@/components/flow-panels/FlowPanelsApp";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <FlowPanelsApp />
    </div>
  );
}
