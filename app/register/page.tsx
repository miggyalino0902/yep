"use client";
import { participantSchema } from "@/lib/form-schemas/participantSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Cluster } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { useRegisterParticipant } from "@/lib/mutations/participantMutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Registerpage = () => {

  const router = useRouter();
  const { mutate: registerParticipant } = useRegisterParticipant({
    onSuccess: () => {
      toast.success("Registered successfully");
      router.push("/my-prize");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof participantSchema>>({
    resolver: zodResolver(participantSchema),
  });

  const onSubmit = async (data: z.infer<typeof participantSchema>) => {
    registerParticipant({ participantData: data });
  };

  const clusters = Object.values(Cluster);
  const clusterOptions = clusters.map((cluster) => (
    <SelectItem key={cluster} value={cluster}>
      {cluster}
    </SelectItem>
  ));

  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <Card className="p-6 w-full mx-4 lg:mx-0 lg:w-1/2 z-50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <p className="text-2xl font-bold text-center">
              Year End Party Registration
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="cluster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cluster</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your cluster" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>{clusterOptions}</SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Registerpage;
