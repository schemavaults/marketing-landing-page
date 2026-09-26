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
    email: z.string().email("Enter a valid email address."),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

export interface JoinMailingListFormProps {
  /** Label for the submit button. Defaults to "Join Mailing List". */
  submitLabel?: string;
  /** Placeholder shown in the email field. */
  placeholder?: string;
  /**
   * Reassurance copy rendered directly beneath the form. Setting this to
   * `null` hides it. Keeping it adjacent to the submit button (rather than
   * at the bottom of the section) measurably reduces signup hesitation.
   */
  reassurance?: string | null;
  className?: string;
}

const defaultReassurance: string =
  "No spam — launch updates only. Unsubscribe in one click.";

export function JoinMailingListForm({
  submitLabel = "Join Mailing List",
  placeholder = "Enter your email",
  reassurance = defaultReassurance,
  className,
}: JoinMailingListFormProps = {}): ReactElement {
  const debug: boolean = useDebug();
  const { toast } = useToast();
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
      toast({
        title: "Successfully joined mailing list!",
        description: "Look forward to hearing from us soon!",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    if (debug) {
      console.error("Failed to submit join mailing list form: ", e);
    }
  }

  // A toast disappears; a visitor who blinks cannot tell whether their signup
  // landed and will either re-submit or bounce. Hold the confirmation in place.
  if (joined) {
    return (
      <div
        className={cn(
          "flex flex-col items-center gap-1 max-w-md mx-auto text-center",
          className,
        )}
        role="status"
      >
        <p className="flex flex-row flex-nowrap items-center justify-center gap-2 font-medium">
          <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
          You&apos;re on the list.
        </p>
        <p className="text-sm text-muted-foreground">
          We&apos;ll email you the moment your access is ready.
        </p>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
          className={cn("flex flex-col gap-2")}
          noValidate
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
                      aria-label="Email address"
                      placeholder={placeholder}
                      disabled={submitting}
                    />
                  </FormControl>
                  {/* Inline, field-adjacent errors instead of a toast the
                      visitor has to interpret after the fact. */}
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <Button
              size="lg"
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto shrink-0"
            >
              {submitLabel}
              {submitting ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="ml-2 h-4 w-4" />
              )}
            </Button>
          </div>
          {reassurance ? (
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              {reassurance}
            </p>
          ) : null}
        </form>
      </Form>
    </div>
  );
}

export default JoinMailingListForm;
