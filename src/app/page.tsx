import { Oi } from "next/font/google";
import { getUserBoards } from "@/lib/dal/getUserBoards";
import { createClient } from "@/lib/supabaseServer";
import AddSharedBoard from "./_components/AddSharedBoard";
import RequestToLogIn from "./_components/RequestToLogIn";
import UserBoardsList from "./_components/UserBoardsList";

const oi = Oi({
  weight: "400",
  subsets: ["latin"],
});

export default async function Home() {
  const client = await createClient();
  const {
    data: { user },
  } = await client.auth.getUser();
  const userBoards = await getUserBoards();

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
            userBoards.length ? (
              <UserBoardsList
                boards={userBoards}
                userName={user.user_metadata.name}
              />
            ) : (
              <AddSharedBoard name={user.user_metadata.name} />
            )
          ) : (
            <RequestToLogIn />
          )}
        </div>
      </div>
    </div>
  );
}
