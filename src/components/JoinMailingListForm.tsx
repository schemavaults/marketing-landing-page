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
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ReactElement, useContext, useState, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z.string().email("Enter a valid email address."),
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
      /*
       * A toast disappears after a few seconds, which left visitors unsure
       * whether the sign-up actually went through -- and some re-submitted.
       * Keep a persistent confirmation in place of the form instead.
       */
      form.reset({ email: "" });
      setJoined(true);
      toast({
        title: "Successfully joined mailing list!",
        description: "Look forward to hearing from us soon!",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    console.error("Failed to submit join mailing list form: ", e);
    toast({
      variant: "destructive",
      title: "Failed to submit form to join mailing list!",
      description: "Double-check your form inputs!",
    });
  }

  if (joined) {
    return (
      <div
        className={cn(
          "max-w-md mx-auto",
          "flex flex-col items-center gap-3",
          "rounded-lg border border-primary/40 bg-primary/5 px-6 py-5",
        )}
        role="status"
      >
        <div className="flex flex-row items-center gap-2 font-semibold">
          <Check className="h-5 w-5 text-primary" />
          You&apos;re on the list.
        </div>
        <p className="text-sm text-muted-foreground text-center">
          We&apos;ll email you as soon as your account can be created. Nothing
          else, and you can unsubscribe from that email in one click.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setJoined(false)}
          className="text-xs"
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
        className={cn("flex flex-col gap-2 max-w-md mx-auto")}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 text-left">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    aria-label="Email address"
                    placeholder="you@company.com"
                    disabled={submitting}
                  />
                </FormControl>
                {/*
                  Inline, field-level errors: previously an invalid address
                  only produced a toast, which is easy to miss and does not
                  point at the input that needs fixing.
                */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="lg" type="submit" disabled={submitting}>
            Join the waitlist
            {submitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          One email when access opens. No drip campaign, unsubscribe in one
          click.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
