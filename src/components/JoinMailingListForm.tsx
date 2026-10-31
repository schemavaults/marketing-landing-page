"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
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
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { ReactElement, useContext, useState, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z
      .string()
      .min(1, { message: "Enter your email address to join the waitlist." })
      .email({ message: "That does not look like a valid email address." }),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

export function JoinMailingListForm(): ReactElement {
  const debug: boolean = useDebug();
  const { toast } = useToast();
  const form = useForm<JoinMailingListFormState>({
    resolver: zodResolver(joinMailingListForm),
    defaultValues: {
      email: "",
    },
  });
  const [submitting, startSubmitting] = useTransition();
  /**
   * A toast disappears after a few seconds and leaves the filled-in form
   * behind, so visitors cannot tell whether it worked and submit again. Track
   * success in component state and show a confirmation that stays put.
   */
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
        // Keep the technical detail in the console for us, and show the
        // visitor something they can act on. Raw strings like "Failed to
        // fetch" leak out of the browser otherwise.
        console.error("Failed to join mailing list: ", e);
        const description: string =
          "We couldn't add you to the list just now. Please try again in a moment, or email us and we'll add you by hand.";
        // Surface the failure inline as well as in a toast: the toast may be
        // missed, and an inline message keeps the retry affordance next to the
        // field that needs it.
        form.setError("email", { type: "server", message: description });
        toast({
          variant: "destructive",
          title: "Failed to join mailing list!",
          description,
        });
        return;
      }

      if (debug) {
        console.log(`[JoinMailingListForm] Successfully joined mailing list!`);
      }
      form.reset();
      setJoined(true);
      toast({
        title: "You're on the list!",
        description: "Look out for an email from us soon.",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    if (debug) {
      console.error("Failed to submit join mailing list form: ", e);
    }
    // Validation messages already render inline under the field, so this only
    // needs to catch the attention of someone who did not notice them.
    toast({
      variant: "destructive",
      title: "Check your email address",
      description: "We need a valid email address to add you to the list.",
    });
  }

  if (joined) {
    return (
      <div
        role="status"
        aria-live="polite"
        className={cn(
          "flex flex-col items-center gap-2",
          "max-w-md mx-auto rounded-lg border border-primary/40 bg-primary/5",
          "px-6 py-5 text-center",
        )}
      >
        <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
        <p className="font-medium">You&apos;re on the waitlist.</p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll email you as soon as early access opens up. No credit card,
          no sales call.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-1"
          onClick={() => setJoined(false)}
        >
          Add another email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
        className={cn("flex flex-col gap-2 max-w-md mx-auto w-full")}
        noValidate
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              {/* Visible-to-screen-readers label: the field previously had no
                  programmatic label at all, only a placeholder. */}
              <FormLabel className="sr-only">Email address</FormLabel>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <FormControl>
                  <Input
                    {...field}
                    className="flex-1"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    disabled={submitting}
                  />
                </FormControl>
                <Button
                  size="lg"
                  type="submit"
                  disabled={submitting}
                  className="shrink-0"
                >
                  {submitting ? "Joining…" : "Join the waitlist"}
                  {submitting ? (
                    <Loader2
                      className="ml-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </div>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground text-center">
          One email when early access opens. Unsubscribe any time — we
          don&apos;t share your address.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
