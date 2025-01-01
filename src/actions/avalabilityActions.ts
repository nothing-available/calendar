"use server";

import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { revalidatePath } from "next/cache";

// Function to update availability details from a form submission
export async function updateAvailabilityAction(formData: FormData) {
  const session = await requireUser();

  // Convert the FormData object into a plain object for easier manipulation

  const rawData = Object.fromEntries(formData.entries());

  // Extract availability data from form fields
  const availabilityData = Object.keys(rawData)
    .filter(key => key.startsWith("id-"))
    .map(key => {
      const id = key.replace("id-", "");
      return {
        id,
        isActive: rawData[`isActive-${id}`] === "on",
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string,
      };
    });

  try {
    // Update all availability records in a single transaction

    await prisma.$transaction(
      availabilityData.map(item =>
        prisma.availability.update({
          where: {
            id: item.id,
          },
          data: {
            isActive: item.isActive,
            fromTime: item.fromTime,
            tillTime: item.tillTime,
          },
        })
      )
    );

    revalidatePath("/dashboard/availability");
  } catch (error) {
    console.log("Error updating availability", error);
  }
}
