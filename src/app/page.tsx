import { Oi } from "next/font/google";
import AddTransactionButton from "./_components/AddTransactionButton";
import Board from "./_components/Board";

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

      <div className="mx-auto max-w-4xl">
        <h1
          className={`${oi.className} text-gradient mt-40 mb-16 text-center text-7xl leading-22 font-bold`}
        >
          🫘 Bean
          <br />
          Counter
        </h1>

        {/* Main transactions board */}
        <Board />

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <AddTransactionButton />
        </div>
      </div>
    </div>
  );
}
