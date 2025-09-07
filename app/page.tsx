"use client";

import { HeadlineWidget } from "@/components/headline-widget";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Headline Widget Editor App
          </h1>
        </div>
        <HeadlineWidget />
      </div>
    </main>
  );
}
