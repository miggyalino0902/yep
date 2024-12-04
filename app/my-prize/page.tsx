'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { prizeSchema } from "@/lib/form-schemas/prizeSchema";
import { useGetParticipantPrize } from "@/lib/queries/participantsQueries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { z } from "zod";

interface Participant {
  name: string;
  email: string;
  prize: {
    name: string;
  };
}


const MyPrizePage = () => {
  const [participant, setParticipant] = useState<Participant>()
  const [email, setEmail] = useState("")
  const { data: participantPrize, refetch, isLoading} = useGetParticipantPrize(email)

   const form = useForm<z.infer<typeof prizeSchema>>({
     resolver: zodResolver(prizeSchema),
   });

  const onSubmit = async (data: z.infer<typeof prizeSchema>) => {
    setEmail(data.email);
    refetch();

    const selectedParticipant = await participantPrize.find(
      (participant: Participant) => participant.email === data.email
    );

    console.log("PARTICIPANT PRIZE", selectedParticipant);

    if (!selectedParticipant) {
      toast.error("No prize found for this email");
      return;
    }
    setParticipant(selectedParticipant);

    setTimeout(() => {
      window.location.reload();
    }, 7000);
  };

  return (
    <div className="p-6 flex flex-col gap-4 w-full h-[90vh] justify-center items-center">
      <Card className="flex flex-col w-full md:w-1/2 xl:w-1/3 p-6 gap-4">
        <p>Enter email to see prize</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>See Prize</Button>
          </form>
        </Form>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Congratulations {participant?.name ? participant.name : "-"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>You won {participantPrize && participant?.prize ? participant.prize.name : "-"}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyPrizePage