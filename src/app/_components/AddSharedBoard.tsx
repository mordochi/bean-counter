import Image from "next/image";
import AddSharedBoardButton from "./AddSharedBoardButton";

export default function AddSharedBoard({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/bean.png"
        alt="Bean Counter"
        width={200}
        height={200}
      />

      <p className="mb-12 text-xl md:text-2xl">
        Hi, {name}!<br />
        To create a shared board, please select a friend from your friend list.
      </p>

      <div className="space-y-6">
        <AddSharedBoardButton />
      </div>
    </div>
  );
}
