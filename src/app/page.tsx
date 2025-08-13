import { Oi } from "next/font/google";
import RequestToLogIn from "./_components/RequestToLogIn";

const oi = Oi({
  weight: "400",
  subsets: ["latin"],
});

export default function Home() {
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

          <RequestToLogIn />
        </div>
      </div>
    </div>
  );
}
