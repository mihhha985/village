"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import type { z } from "zod";
import { Button } from "@/src/lib/ui/button";
import { Card } from "@/src/lib/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/lib/ui/form";
import { Input } from "@/src/lib/ui/input";
import { Spinner } from "@/src/lib/ui/spinner";
import { Textarea } from "@/src/lib/ui/textarea";
import { FeedbackRequestSchema } from "@/src/lib/validations/booking";
import { submitFeedbackRequest } from "@/src/lib/utils/submit-request";

type FeedbackData = z.infer<typeof FeedbackRequestSchema>;

export function ContactsFeedbackForm() {
  const submitting = useRef(false);
  const [pending, setPending] = useState(false);
  const form = useForm<FeedbackData>({
    resolver: zodResolver(FeedbackRequestSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  async function onSubmit(data: FeedbackData) {
    if (submitting.current) return;
    submitting.current = true;
    setPending(true);
    try {
      await submitFeedbackRequest(data);
      toast.success("Сообщение отправлено. Мы скоро свяжемся с вами!");
      form.reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Не удалось отправить сообщение");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <Card className="contacts-form-card border-none p-5 md:p-7">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex h-full flex-col gap-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl><Input autoComplete="name" placeholder="Иван Сергеев" className="contacts-form-control" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Номер телефона</FormLabel>
              <FormControl><Input type="tel" autoComplete="tel" inputMode="tel" placeholder="+7 (990) 999-99-99" className="contacts-form-control" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="message" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Сообщение</FormLabel>
              <FormControl><Textarea placeholder="Напишите, какой у вас запрос" className="contacts-form-control min-h-28 resize-none md:min-h-34" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <Button type="submit" disabled={pending} aria-label="Отправить сообщение" className="mt-auto w-full">
            {pending && <Spinner />}{pending ? "Отправка..." : "Отправить"}
          </Button>
          <p className="contacts-policy">Отправляя заявку, вы соглашаетесь с обработкой персональных данных.<br />Мы используем ваши контакты только для связи и оформления бронирования.</p>
        </form>
      </Form>
    </Card>
  );
}
