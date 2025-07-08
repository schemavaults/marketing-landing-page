"use client";

import { JoinMailingListSubmitFunctionContext } from "@/contexts/JoinMailingListSubmitFunctionContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  cn,
  Form,
  FormControl,
  Input,
  useForm,
  useToast,
} from "@schemavaults/ui";
import { ArrowRight } from "lucide-react";
import { ReactElement, useContext } from "react";
import { z } from "zod";

const joinMailingListForm = z
  .object({
    email: z.string().email(),
  })
  .required({ email: true })
  .strict();

type JoinMailingListFormState = z.infer<typeof joinMailingListForm>;

export function JoinMailingListForm(): ReactElement {
  const { toast } = useToast();
  const form = useForm<JoinMailingListFormState>({
    resolver: zodResolver(joinMailingListForm),
    defaultValues: {
      email: "",
    },
  });

  const joinMailingList = useContext(JoinMailingListSubmitFunctionContext);

  function onSubmit(values: JoinMailingListFormState): void {
    const email: string = values.email;
    const joinMailingListOperationPromise: Promise<void> =
      joinMailingList(email);

    joinMailingListOperationPromise
      .then((): void => {
        toast({
          title: "Successfully joined mailing list!",
          description: "Look forward to hearing from us soon!",
        });
      })
      .catch((e: unknown): void => {
        console.error("Failed to join mailing list: ", e);
        toast({
          variant: "destructive",
          title: "Failed to join mailing list!",
          description:
            e instanceof Error ? e.message : "An unknown error has occurred!",
        });
      });
  }

  function onSubmitFailure(e: unknown): void {
    console.error("Failed to submit join mailing list form: ", e);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onSubmitFailure)}
        className={cn("flex flex-col sm:flex-row gap-4 max-w-md mx-auto")}
      >
        <Input
          className="flex-1"
          {...form.register("email")}
          type="email"
          placeholder="Enter your email"
        />
        <Button size="lg" type="submit">
          Join Mailing List
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </Form>
  );
}

export default JoinMailingListForm;
