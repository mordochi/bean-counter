import AddTransactionButton from "./_components/AddTransactionButton";
import Board from "./_components/Board";

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
        <h1 className="text-gradient mt-12 mb-16 text-center text-5xl font-bold">
          🫘 Bean Counter
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
