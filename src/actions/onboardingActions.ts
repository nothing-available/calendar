"use server";

import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { onboardingSchemasValidation } from "@/lib/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

export async function OnBoardingAction(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemasValidation({
      async isUsernameUnique() {
        const existingUsername = await prisma.user.findUnique({
          where: {
            userName: formData.get("userName") as string,
          },
        });
        return !existingUsername;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: "Mon",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Tue",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Wed",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Thu",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Fri",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sat",
              fromTime: "08:00",
              tillTime: "18:00",
            },
            {
              day: "Sun",
              fromTime: "08:00",
              tillTime: "18:00",
            },
          ],
        },
      },
    },
  });

  return redirect("/onboarding/grant-id");
}
