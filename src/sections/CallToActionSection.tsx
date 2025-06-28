"use client";

import { Button, Input, Wordmark } from "@schemavaults/ui";
import { cn } from "@schemavaults/ui";
import { ArrowRight } from "lucide-react";
import type { ReactElement } from "react";

export function CTASection(): ReactElement {
  return (
    <section
      className={cn("py-24", "w-full", "flex justify-center items-start")}
    >
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to transform your data relationships?
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground text-lg">
              Start building with <Wordmark /> as soon as it is available to the
              public. Enter your email below to get notified when early access
              is available.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button size="lg">
              Join Mailing List
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
            <Button variant="ghost" size="lg">
              View Documentation
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Free 14-day trial • No setup fees • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
