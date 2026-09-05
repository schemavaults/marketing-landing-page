"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  FormControl,
  FormDescription,
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
    email: z
      .string()
      .min(1, { message: "Enter your email address to continue." })
      .email({ message: "That does not look like a valid email address." }),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

const privacyReassurance: string =
  "We only email you about SchemaVaults. Unsubscribe at any time.";

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
      // A toast disappears; the visitor needs a durable confirmation that the
      // one action we asked them to take actually worked.
      setJoined(true);
      form.reset();
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
          "flex flex-col items-center gap-2 max-w-md mx-auto",
          "rounded-lg border border-green-500/40 bg-green-500/5 px-6 py-5",
        )}
        role="status"
      >
        <CheckCircle2 className="h-6 w-6 text-green-500" />
        <p className="font-medium">You are on the list.</p>
        <p className="text-sm text-muted-foreground text-center">
          Watch your inbox — we will email you as soon as there is something
          worth telling you about.
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setJoined(false)}
          data-analytics-id="mailing-list-add-another"
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
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1 text-left">
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-label="Email address"
                    placeholder="Enter your email"
                    disabled={submitting}
                  />
                </FormControl>
                {/*
                  The same reassurance the sighted visitor reads below the
                  form, wired up as the input's description.
                */}
                <FormDescription className="sr-only">
                  {privacyReassurance}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            size="lg"
            type="submit"
            disabled={submitting}
            data-analytics-id="mailing-list-submit"
          >
            {submitting ? "Joining..." : "Join Mailing List"}
            {submitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center" aria-hidden>
          {privacyReassurance}
        </p>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
