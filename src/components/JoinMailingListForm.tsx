"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
import usePrivateBeta from "@/hooks/usePrivateBeta";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  Input,
  Label,
  useForm,
  useToast,
} from "@schemavaults/ui";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { ReactElement, useContext, useState, useTransition } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z.string().email(),
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
      // Clear the field so a satisfied visitor cannot accidentally re-submit.
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
          "flex flex-col items-center gap-2",
          "rounded-lg border border-primary/40 bg-primary/5 px-6 py-5",
        )}
        role="status"
      >
        <div className="flex flex-row flex-nowrap items-center gap-2 font-medium">
          <Check className="h-4 w-4 text-green-500" />
          You are on the list.
        </div>
        <p className="text-sm text-muted-foreground text-center">
          {privateBeta
            ? "We will email you as soon as public early access opens. Nothing else, we promise."
            : "We will email you when there is something worth reading. Nothing else, we promise."}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setJoined(false)}
          className="text-muted-foreground"
        >
          Add another email
        </Button>
      </div>
    );
  }

  const emailFieldId: string = "join-mailing-list-email";

  return (
    <Form {...form}>
      <div className="max-w-md mx-auto flex flex-col gap-2">
        <form
          onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
          className={cn("flex flex-col sm:flex-row gap-4 w-full")}
        >
          <Label htmlFor={emailFieldId} className="sr-only">
            Email address
          </Label>
          <Input
            id={emailFieldId}
            className="flex-1"
            {...form.register("email")}
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            disabled={submitting}
          />
          <Button size="lg" type="submit" disabled={submitting}>
            {privateBeta ? "Join the waitlist" : "Keep me posted"}
            {submitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center">
          {privateBeta
            ? "One email when early access opens. No spam, unsubscribe in one click."
            : "Occasional product updates. No spam, unsubscribe in one click."}
        </p>
      </div>
    </Form>
  );
}

export default JoinMailingListForm;
