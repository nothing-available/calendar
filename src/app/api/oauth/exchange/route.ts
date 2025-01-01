import prisma from "@/lib/db";
import requireUser from "@/lib/hooks";
import { nylas, nylasConfig } from "@/lib/nylas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = await requireUser();
  const url = new URL(req.url);

  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("Hey we did not get the code", {
      status: 400,
    });
  }

  const codeExchangePayload = {
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId,
    redirectUri: nylasConfig.redirectUri,
    code: code,
  };

  try {
    const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);

    const { grantId,email } = response;

    await prisma.user.update({
      where: {
        id: session.user?.id as string,
      },
      data: {
        grantID: grantId,
        grnatEmail: email,
      },
    });
  } catch (error) {
    console.log("Error exchange code for token", error);
  }

  redirect("/dashboard");
}
