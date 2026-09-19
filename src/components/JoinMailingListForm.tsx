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
import { ArrowRight, Loader2 } from "lucide-react";
import { ReactElement, useContext, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z
      .string()
      .min(1, { message: "Please enter your email address." })
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
      // Clear the field so a success toast is not left sitting next to an
      // email address that looks like it still needs submitting.
      form.reset({ email: "" });
      toast({
        title: "You're on the list!",
        description:
          "Check your inbox — we'll be in touch as soon as there's news.",
      });
    });
  }

  function onSubmitFailure(e: unknown): void {
    // Field-level messages are rendered inline by <FormMessage />; this only
    // runs for submit attempts that never reach the server.
    if (debug) {
      console.error("Failed to submit join mailing list form: ", e);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
        className={cn("flex flex-col gap-2 max-w-md mx-auto w-full")}
      >
        <div className="flex flex-col sm:flex-row gap-4 w-full">
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
          <Button size="lg" type="submit" disabled={submitting}>
            Join Mailing List
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
        <p className="text-xs text-muted-foreground text-center">
          No spam, ever. Unsubscribe in one click.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
