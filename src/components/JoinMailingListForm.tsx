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
    email: z.string().email("Enter a valid email address."),
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
      // Clear the field and switch to an inline confirmation: a toast alone
      // disappears, leaving the visitor unsure whether the signup landed.
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
        role="status"
        className={cn(
          "max-w-md mx-auto w-full",
          "flex flex-col items-center gap-2",
          "rounded-lg border border-primary/40 bg-primary/5 px-6 py-5",
        )}
      >
        <div className="flex flex-row items-center gap-2 font-medium">
          <Check className="h-5 w-5 text-primary" aria-hidden="true" />
          You&apos;re on the list
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {privateBeta
            ? "We'll email you as soon as early access opens up."
            : "We'll send you product updates as they ship."}
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
        // Let zod own validation so the message renders inline and stays
        // associated with the input for assistive tech; the native bubble
        // would otherwise pre-empt it and then vanish.
        noValidate
        className={cn("flex flex-col gap-2 max-w-md mx-auto w-full")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="sr-only">Email address</FormLabel>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <FormControl>
                  <Input
                    {...field}
                    className="flex-1"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    disabled={submitting}
                  />
                </FormControl>
                <Button size="lg" type="submit" disabled={submitting}>
                  {submitting ? "Joining…" : "Join Mailing List"}
                  {submitting ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
              {/* Inline validation: a toast is easy to miss and is not
                  associated with the field for screen readers. */}
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground text-center">
          {privateBeta ? "Launch announcements only." : "Product updates only."}{" "}
          No spam, and you can unsubscribe at any time.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
