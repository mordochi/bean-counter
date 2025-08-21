import Image from "next/image";
import Link from "next/link";
import { UserBoard } from "@/lib/dal/getUserBoards";

interface UserBoardsListProps {
  boards: UserBoard[];
}

export default async function UserBoardsList({ boards }: UserBoardsListProps) {
  return (
    <div className="mb-8 flex w-full flex-col rounded-lg bg-white/90 p-8 shadow-lg">
      <div className="flex items-center justify-between py-2">
        <h4 className="text-lg font-semibold">Board Name</h4>
        <h4 className="text-lg font-semibold">Friend</h4>
      </div>
      {boards.map((board) => (
        <Link key={board.id} href={`/board/${board.id}`}>
          <div className="flex cursor-pointer items-center justify-between py-2 hover:underline">
            <h3 className="text-base font-semibold text-gray-800">
              {board.board_name || "Untitled Board"}
            </h3>

            <div className="flex items-center gap-3">
              {board.friend?.avatar ? (
                <Image
                  src={board.friend.avatar}
                  alt={`${board.friend.name || board.friend.email} avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <span className="text-sm font-medium text-gray-600">
                    {(board.friend?.name || board.friend?.email || "?")
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>
              )}

              <p className="text-sm text-gray-600">
                {board.friend?.name || board.friend?.email || "Unknown User"}
              </p>
            </div>
          </div>{" "}
        </Link>
      ))}
    </div>
  );
}
