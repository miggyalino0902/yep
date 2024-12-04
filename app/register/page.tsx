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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Cluster } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { useRegisterParticipant } from "@/lib/mutations/participantMutations";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { poplarHomesEmails } from "@/lib/constants/email";

const Registerpage = () => {

  const router = useRouter();
  const { mutate: registerParticipant, isPending } = useRegisterParticipant({
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

  const formatClusterName = (name: string) => {
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const clusterOptions = clusters.map((cluster) => (
    <SelectItem key={cluster} value={cluster}>
      {formatClusterName(cluster)}
    </SelectItem>
  ));

  const emailOptions = poplarHomesEmails.map((email) => {
    return {
      label: email,
      value: email,
    }
  })

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
                <FormItem className="flex flex-col">
                  <FormLabel>Email</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? emailOptions.find(
                                (email) => email.value === field.value
                              )?.label
                            : "Select Email"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search language..." />
                        <CommandList>
                          <CommandEmpty>No email found.</CommandEmpty>
                          <CommandGroup>
                            {emailOptions.map((email) => (
                              <CommandItem
                                value={email.label}
                                key={email.value}
                                onSelect={() => {
                                  form.setValue("email", email.value);
                                }}
                              >
                                {email.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    email.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Registerpage;
