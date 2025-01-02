"use server";

import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { eventTypeSchema } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function CreateEventTypeAction(
  prevState: any,
  formData: FormData
) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: eventTypeSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.eventType.create({
    data: {
      tittle: submission.value.tittle,
      duration: submission.value.duration,
      url: submission.value.url,
      description: submission.value.description,
      videoCallSoftware: submission.value.videoCallProvider,
      userId: session.user?.id,
    },
  });

  return redirect("/dashboard");
}
