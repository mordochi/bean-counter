import { Oi } from "next/font/google";
import Image from "next/image";
import { createClient } from "@/lib/supabaseServer";
import RequestToLogIn from "./_components/RequestToLogIn";

const oi = Oi({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  return (
    <div className="container min-h-screen">
      {/* Floating background shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <h1
            className={`${oi.className} text-gradient mb-8 text-7xl leading-tight font-bold md:text-8xl`}
          >
            🫘 Bean
            <br />
            Counter
          </h1>

          {user ? (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/bean.png"
                alt="Bean Counter"
                width={200}
                height={200}
              />

              <p className="mb-12 max-w-2xl text-xl md:text-2xl">
                Welcome back, {user.email}! Ready to split some expenses?
              </p>

              <div className="space-y-6">
                {/* Add your main app content here */}
                <p className="text-green-600">You are logged in!</p>
              </div>
            </div>
          ) : (
            <RequestToLogIn />
          )}
        </div>
      </div>
    </div>
  );
}
