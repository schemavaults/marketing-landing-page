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
import { ArrowRight, Loader2 } from "lucide-react";
import { ReactElement, useContext, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z.string().email("Enter an email address we can actually reach."),
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
    mode: "onBlur",
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
      toast({
        title: privateBeta
          ? "You're on the early access list!"
          : "Successfully joined mailing list!",
        description: privateBeta
          ? "We'll email you an invite code as soon as a spot opens up."
          : "Look forward to hearing from us soon!",
      });
      /** Clear the field so the success state is unambiguous. */
      form.reset();
    });
  }

  function onSubmitFailure(e: unknown): void {
    /**
     * Validation errors are rendered inline by <FormMessage /> below, so this
     * only needs to cover the case where the form could not be submitted at
     * all. No toast for a simple typo — the inline message is clearer and
     * sits next to the field that needs fixing.
     */
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
                    inputMode="email"
                    placeholder="you@company.com"
                    disabled={submitting}
                  />
                </FormControl>
                <Button size="lg" type="submit" disabled={submitting}>
                  {privateBeta ? "Get early access" : "Join mailing list"}
                  {submitting ? (
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowRight className="ml-2 h-4 w-4" />
                  )}
                </Button>
              </div>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground text-center">
          We&rsquo;ll only email you about early access and product updates.
          No spam, and you can unsubscribe in one click.
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
