"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
import useTrackConversionEvent from "@/hooks/useTrackConversionEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
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

export interface JoinMailingListFormProps {
  /** Label for the submit button. Defaults to a benefit-oriented label. */
  submitLabel?: string;
  /**
   * Reassurance text rendered under the field. Pass `null` to hide it.
   * Shown by default: asking for an email without saying what you will do
   * with it measurably depresses opt-in rates.
   */
  privacyNote?: string | null;
  /** Which landing page section this form instance lives in, for analytics. */
  section?: string;
  className?: string;
}

const defaultPrivacyNote: string =
  "One launch announcement and the occasional product update. No spam, and you can unsubscribe in one click.";

export function JoinMailingListForm({
  submitLabel = "Get early access",
  privacyNote = defaultPrivacyNote,
  section,
  className,
}: JoinMailingListFormProps = {}): ReactElement {
  const debug: boolean = useDebug();
  const { toast } = useToast();
  const track = useTrackConversionEvent();
  const form = useForm<JoinMailingListFormState>({
    resolver: zodResolver(joinMailingListForm),
    defaultValues: {
      email: "",
    },
  });
  const [submitting, startSubmitting] = useTransition();
  const [joined, setJoined] = useState<boolean>(false);
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
        track("waitlist_join_failed", { section });
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
      track("waitlist_join_succeeded", { section });
      // Clear the field and switch to a persistent inline confirmation so the
      // visitor is not left wondering whether it worked once the toast expires
      // (and cannot accidentally submit the same address twice).
      form.reset({ email: "" });
      setJoined(true);
      toast({
        title: "You're on the list!",
        description: "Look forward to hearing from us soon!",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    if (debug) {
      console.warn("Join mailing list form failed validation: ", e);
    }
    // Field-level messages render inline below, so a toast here would just be
    // a second copy of the same error.
  }

  if (joined) {
    return (
      <div
        className={cn(
          "max-w-md mx-auto",
          "flex flex-row flex-nowrap gap-3 items-center justify-center",
          "rounded-lg border border-green-600/40 bg-green-600/10 px-4 py-3",
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <Check className="h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
        <p className="text-sm text-left">
          <span className="font-semibold">You&apos;re on the list.</span> We
          will email you as soon as your invite is ready.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("max-w-md mx-auto w-full", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
          className={cn("flex flex-col gap-2")}
        >
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1 w-full space-y-1">
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      aria-label="Email address"
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
              className="w-full sm:w-auto shrink-0"
              onClick={() =>
                track("hero_waitlist_submit_intent", { section })
              }
            >
              {submitLabel}
              {submitting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          {privacyNote && (
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              {privacyNote}
            </p>
          )}
        </form>
      </Form>
    </div>
  );
}

export default JoinMailingListForm;
