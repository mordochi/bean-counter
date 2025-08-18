"use client";
import Button from "@/components/Button";
import SupabaseClient from "@/lib/supabaseClient";

export default function LogInButton() {
  const handleLogIn = async () => {
    await SupabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Button type="primary" onClick={handleLogIn}>
      ✨ Get yourself a Bean Counter
    </Button>
  );
}
