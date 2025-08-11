import { createServerClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const globalForSupabaseServer = globalThis as unknown as {
  supabaseServer: SupabaseClient | undefined;
};

export async function createClient() {
  if (globalForSupabaseServer.supabaseServer)
    return globalForSupabaseServer.supabaseServer;

  const cookieStore = await cookies();

  const supabaseServer = await createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );

  if (process.env.NODE_ENV !== "production")
    globalForSupabaseServer.supabaseServer = supabaseServer;

  return supabaseServer;
}
