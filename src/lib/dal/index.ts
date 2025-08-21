import "server-only";
import { cache } from "react";
import { createClient } from "@/lib/supabaseServer";

export const verifySession = cache(async () => {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user?.id) {
    return null;
  }

  return { userId: user.id, user };
});
