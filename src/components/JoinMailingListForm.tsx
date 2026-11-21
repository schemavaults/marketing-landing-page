"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useForm,
  useToast,
} from "@schemavaults/ui";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ReactElement, useContext, useState, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z
      .string()
      .min(1, { message: "Enter your email address to continue." })
      .email({ message: "That does not look like a valid email address." }),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

export function JoinMailingListForm(): ReactElement {
  const debug: boolean = useDebug();
  const privateBeta: boolean = usePrivateBeta();
  const { toast } = useToast();
  const form = useForm<JoinMailingListFormState>({
    resolver: zodResolver(joinMailingListForm),
    defaultValues: {
      email: "",
    },
    // Surface the inline error as soon as the field loses focus rather than
    // only after a failed submit attempt.
    mode: "onBlur",
  });
  const [submitting, startSubmitting] = useTransition();
  /**
   * A toast disappears. Visitors who look away for a second are left unsure
   * whether their address was captured and either re-submit or leave; an
   * in-place confirmation is the state they can actually trust.
   */
  const [submitted, setSubmitted] = useState<boolean>(false);
  const joinMailingList = useContext(JoinMailingListSubmitFunctionContext);

  function onSubmit(values: JoinMailingListFormState): void {
    const email: string = values.email;
    if (debug) {
      console.log(
        `[JoinMailingListForm] onSubmit(values = ${JSON.stringify(values)})`,
      );
    }

    startSubmitting(async (): Promise<void> => {
      try {
        await joinMailingList(email);
      } catch (e: unknown) {
        console.error("Failed to join mailing list: ", e);
        toast({
          variant: "destructive",
          title: "Failed to join mailing list!",
          description:
            e instanceof Error ? e.message : "An unknown error has occurred!",
        });
        return;
      }

      if (debug) {
        console.log(`[JoinMailingListForm] Successfully joined mailing list!`);
      }
      setSubmitted(true);
      form.reset();
      toast({
        title: "You're on the list!",
        description: privateBeta
          ? "We'll email you as soon as your invite is ready."
          : "Look forward to hearing from us soon!",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    if (debug) {
      console.error("Failed to submit join mailing list form: ", e);
    }
    // The inline <FormMessage /> already tells the visitor exactly which field
    // is wrong and why, so a destructive toast on top of it is just noise.
  }

  if (submitted) {
    return (
      <div
        role="status"
        className={cn(
          "max-w-md mx-auto",
          "flex flex-row flex-nowrap items-center justify-center gap-3",
          "rounded-lg border border-green-500/40 bg-green-500/10",
          "px-4 py-3 text-sm",
        )}
      >
        <Check className="h-5 w-5 text-green-500 shrink-0" aria-hidden="true" />
        <span>
          <span className="font-semibold">You&rsquo;re on the list.</span>{" "}
          {privateBeta
            ? "We’ll email you once your invite is ready."
            : "Check your inbox for a confirmation."}
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
          className={cn("flex flex-col gap-2")}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 text-left">
                  <FormLabel className="sr-only">Email address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@company.com"
                      disabled={submitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              type="submit"
              disabled={submitting}
              className="shrink-0"
            >
              {privateBeta ? "Get early access" : "Keep me posted"}
              {submitting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            {privateBeta
              ? "One email when your invite is ready. No drip campaign, unsubscribe any time."
              : "Occasional product updates only. No spam, unsubscribe any time."}
          </p>
        </form>
      </Form>
    </div>
  );
}

export default JoinMailingListForm;
