"use client";

import { SettingsAction } from "@/actions/settingsActions";
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
import { UploadDropzone } from "@/lib/uploadthing";
import { settingsSchema } from "@/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

interface iAppsProps {
  fullName: string;
  email: string;
  imageProfile: string;
}

export function DashBoardSettingsForm({
  email,
  fullName,
  imageProfile,
}: iAppsProps) {
  const [lastResult, action] = useFormState(SettingsAction, undefined);

  const [currentProfileImage, setCurrentProfileImage] = useState(imageProfile);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: settingsSchema,
      });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account Settings!</CardDescription>
      </CardHeader>

      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        noValidate>
        <CardContent className='flex flex-col gap-y-4'>
          <div className='flex flex-col gap-y-2'>
            <Label>Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder='Sumit kumar'
              defaultValue={fullName}
            />
            <p className=' text-red-500 text-sm'>{fields.fullName.errors}</p>
          </div>

          <div className='flex flex-col gap-y-2'>
            <Label> Email</Label>
            <Input
              placeholder='email@gmailcom'
              defaultValue={email}
              disabled
            />
          </div>

          <div className='grid gap-y-5'>
            <Label>Profile Image</Label>
            <Input
              type='hidden'
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            {currentProfileImage ? (
              <div className='relative size-16'>
                <Image
                  src={currentProfileImage}
                  alt='Profile Image'
                  width={300}
                  height={300}
                  className='size-16 rounded-lg'
                />
                <Button
                  onClick={handleDeleteImage}
                  type='button'
                  variant={"destructive"}
                  size={"icon"}
                  className='absolute -top-3 -right-3'>
                  <X className='size-4' />
                </Button>
              </div>
            ) : (
              <UploadDropzone
                onClientUploadComplete={res => {
                  setCurrentProfileImage(res[0].url);
                  toast.success("Profile Image has been uploaded");
                }}
                onUploadError={error => {
                  console.log("something went wrong", error);
                  toast.error(error.message);
                }}
                endpoint='imageUploader'
              />
            )}
            <p className='text-red-500 text-sm'>
              {fields.profileImage.errors}{" "}
            </p>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton text='Save Changes'></SubmitButton>
        </CardFooter>
      </form>
    </Card>
  );
}
