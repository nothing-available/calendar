"use client";

import { OnBoardingAction } from "@/actions/onboardingActions";
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
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemas } from "@/lib/zodSchemas";
import { SubmitButton } from "@/components/common/SubmitButton";

export default function Onboarding() {
  const [lastResult, action] = useFormState(OnBoardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    //Client validation. Fallback to server validation if not provided
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: onboardingSchemas,
      });
    },

    shouldValidate: "onBlur", // Configure when each field should be validated
    shouldRevalidate: "onInput",
  });

  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to TimeSpark</CardTitle>
          <CardDescription>
            We need following information to setup your profile !
          </CardDescription>
        </CardHeader>

        <form
          id={form.id}
          action={action}
          onSubmit={form.onSubmit}
          noValidate>
          <CardContent className='flex flex-col gap-y-5'>
            <div className='grid gap-y-2'>
              <Label>Full Name</Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder='Sumit Kumar'
              />
              <p className='text-red-400 text-sm'>{fields.fullName.errors}</p>
            </div>

            <div className='grid gap-y-2'>
              <Label>Username</Label>
              <div className='flex rounded-md'>
                <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-muted-foreground text-sm'>
                  TimeSpark.com/
                </span>
                <Input
                  type='text'
                  name={fields.userName.name}
                  key={fields.userName.key}
                  defaultValue={fields.userName.initialValue}
                  placeholder='username'
                  className='rounded-l-none'
                />
              </div>
              <p className='text-red-400 text-sm'>{fields.userName.errors}</p>
            </div>
          </CardContent>

          <CardFooter className='w-full'>
            <SubmitButton
              text='Submit'
              classname='w-full'
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
