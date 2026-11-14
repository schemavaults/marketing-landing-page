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
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
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
    mode: "onTouched",
  });
  const [submitting, startSubmitting] = useTransition();
  /**
   * A toast disappears. A visitor who submits, looks away, and looks back
   * needs to still be able to tell that it worked -- otherwise they submit
   * again or assume the form is broken.
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
      setJoined(true);
      form.reset();
      toast({
        title: "You're on the list!",
        description: privateBeta
          ? "We'll email you as soon as your early access is ready."
          : "Look forward to hearing from us soon!",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    if (debug) {
      console.error("Failed to submit join mailing list form: ", e);
    }
    // Field-level errors are rendered inline by <FormMessage />; no toast
    // needed for a simple validation miss.
  }

  if (joined) {
    return (
      <div
        role="status"
        className={cn(
          "mx-auto max-w-md w-full",
          "flex flex-col items-center gap-2",
          "rounded-lg border border-border bg-muted/40 px-6 py-5",
        )}
      >
        <CheckCircle2
          className="h-6 w-6 text-green-600 dark:text-green-500"
          aria-hidden="true"
        />
        <p className="font-medium">You&rsquo;re on the list.</p>
        <p className="text-sm text-muted-foreground text-center">
          {privateBeta
            ? "We'll email you the moment early access opens up. No spam in the meantime."
            : "Check your inbox soon — we'll be in touch."}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setJoined(false)}
          className="mt-1"
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
      >
        <div className="flex flex-col sm:flex-row gap-3 w-full items-start">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 w-full text-left">
                <FormLabel className="sr-only">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    disabled={submitting}
                    aria-label="Email address"
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
          >
            {privateBeta ? "Get early access" : "Join mailing list"}
            {submitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          One email when early access opens. No spam, and you can unsubscribe in
          one click.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
