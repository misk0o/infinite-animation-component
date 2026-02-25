import type { Metadata } from "next";
import InteractiveHaloDemo from "@/components/InteractiveHaloDemo";

export const metadata: Metadata = {
  title: "enjoy!",
  description: "Interactive demo of the infinite animation component",
};

export default function DemoPage() {
  return <InteractiveHaloDemo />;
}

