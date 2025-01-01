import { conformZodMessage } from "@conform-to/zod";
import { z } from "zod";

export const onboardingSchemas = z.object({
  fullName: z.string().min(3).max(128),
  userName: z
    .string()
    .min(3)
    .max(128)
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Username can only contain letters and number",
    }),
});

export function onboardingSchemasValidation(options?: {
  isUsernameUnique: () => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(128)
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "Username can only contain letters and number",
      })
      .pipe(
        z.string().superRefine((_, ctx) => {
          if (typeof options?.isUsernameUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          return options.isUsernameUnique().then(isUnique => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "username is already used",
              });
            }
          });
        })
      ),
    fullName: z.string().min(3).max(128),
  });
}

export const settingsSchema = z.object({
  fullName: z.string().min(3).max(128),

  profileImage: z.string(),
});
