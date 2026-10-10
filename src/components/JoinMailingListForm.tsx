"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import useDebug from "@/hooks/useDebug";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  Input,
  useForm,
  useToast,
} from "@schemavaults/ui";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import {
  type ReactElement,
  useContext,
  useState,
  useTransition,
} from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z.string().email(),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

export interface JoinMailingListFormProps {
  /** Submit button label. Defaults to "Join mailing list". */
  label?: string;
}

export function JoinMailingListForm({
  label = "Join mailing list",
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
  /**
   * A toast alone was not enough: after a successful submit the input went
   * back to looking empty and un-submitted, which reads as a failure and
   * invites duplicate signups.
   */
  const [joined, setJoined] = useState<boolean>(false);
  const joinMailingList = useContext(JoinMailingListSubmitFunctionContext);

  const fieldError: string | undefined = form.formState.errors.email?.message;

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
      form.reset();
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
          "max-w-md mx-auto",
          "flex flex-col items-center gap-2",
          "rounded-lg border border-primary/40 bg-primary/5",
          "px-6 py-5 text-center",
        )}
      >
        <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
        <p className="font-semibold">You&apos;re on the list.</p>
        <p className="text-sm text-muted-foreground">
          Check your inbox for a confirmation. We only email when there is
          something worth your time.
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
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <label className="sr-only" htmlFor="join-mailing-list-email">
            Email address
          </label>
          <Input
            id="join-mailing-list-email"
            className="flex-1"
            {...form.register("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            disabled={submitting}
            aria-invalid={fieldError ? true : undefined}
            aria-describedby={
              fieldError ? "join-mailing-list-email-error" : undefined
            }
          />
          <Button size="lg" type="submit" disabled={submitting}>
            {label}
            {submitting ? (
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
        {fieldError && (
          <p
            id="join-mailing-list-email-error"
            className="text-sm text-destructive text-left"
          >
            {fieldError}
          </p>
        )}
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
