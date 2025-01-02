"use client";

import { CreateEventTypeAction } from "@/actions/eventTypeActions";
import { ButtonGroup } from "@/components/common/ButtonGroup";
import { SubmitButton } from "@/components/common/SubmitButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import { useState } from "react";
import { useFormState } from "react-dom";

type VideoCallProvider = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export default function NewEventRoute() {
  const [activePlatform, setActivePlatform] =
    useState<VideoCallProvider>("Google Meet");

  const [lastResult, action] = useFormState(CreateEventTypeAction, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: eventTypeSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className='w-full h-full flex flex-1 items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Add new appointment type</CardTitle>
          <CardDescription>
            Create new appointment type that allow people to book you!
          </CardDescription>
        </CardHeader>

        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate>
          <CardContent className='grid gap-y-5'>
            <div className='flex flex-col gap-y-2'>
              <Label>Tittle</Label>
              <Input
                name={fields.tittle.name}
                key={fields.tittle.key}
                defaultValue={fields.tittle.initialValue}
                placeholder='30 minute meeting'
              />
              <p className='text-red-500 text-sm'>{fields.tittle.errors}</p>
            </div>

            <div className='flex flex-col gap-y-2'>
              <Label>URL Slug</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground'>
                  TimeSparks.com/
                </span>
                <Input
                  name={fields.url.name}
                  key={fields.url.key}
                  defaultValue={fields.url.initialValue}
                  className='rounded-l-none'
                  placeholder='Example-url-1'
                />
              </div>
              <p className='text-red-500 text-sm'>{fields.url.errors}</p>
            </div>

            <div className='flex flex-col gap-y-2'>
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={fields.description.initialValue}
                placeholder='Meet me in this meeting to meet me!'
              />
              <p className='text-red-500 text-sm'>
                {fields.description.errors}
              </p>
            </div>

            <div className='flex flex-col gap-y-2'>
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={fields.duration.initialValue}>
                <SelectTrigger>
                  <SelectValue placeholder='Select Duration' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value='15'>15 min</SelectItem>
                    <SelectItem value='30'>30 min</SelectItem>
                    <SelectItem value='45'>45 min</SelectItem>
                    <SelectItem value='60'>60 min</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className='text-red-500 text-sm'>{fields.duration.errors}</p>
            </div>

            <div className='grid gap-y-2'>
              <Label>Video Call Provider</Label>
              <input
                type='hidden'
                name={fields.videoCallProvider.name}
                value={activePlatform}
              />
              <ButtonGroup>
                <Button
                  type='button'
                  onClick={() => setActivePlatform("Zoom Meeting")}
                  className='w-full'
                  variant={
                    activePlatform === "Zoom Meeting" ? "secondary" : "outline"
                  }>
                  Zoom
                </Button>

                <Button
                  type='button'
                  onClick={() => setActivePlatform("Google Meet")}
                  className='w-full'
                  variant={
                    activePlatform === "Google Meet" ? "secondary" : "outline"
                  }>
                  Google Meet
                </Button>

                <Button
                  type='button'
                  onClick={() => setActivePlatform("Microsoft Teams")}
                  className='w-full'
                  variant={
                    activePlatform === "Microsoft Teams"
                      ? "secondary"
                      : "outline"
                  }>
                  Microsoft Team
                </Button>
              </ButtonGroup>
              <p className='text-red-500 text-sm'>
                {fields.videoCallProvider.errors}
              </p>
            </div>
          </CardContent>

          <CardFooter className='w-full flex justify-between'>
            <Button
              variant={"secondary"}
              asChild>
              <Link href={"/dashboard"}>Cancel</Link>
            </Button>
            <SubmitButton text='Create Event type' />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
