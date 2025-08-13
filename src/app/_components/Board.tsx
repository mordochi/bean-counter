"use client";

const mockTransactions = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    created_at: "2024-08-10T10:30:00Z",
    updated_at: "2024-08-10T10:30:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-10",
    item: "Groceries",
    total_amount: 45.67,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    created_at: "2024-08-09T14:15:00Z",
    updated_at: "2024-08-09T14:15:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-09",
    item: "Coffee",
    total_amount: 4.5,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440011",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440011",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    created_at: "2024-08-08T16:45:00Z",
    updated_at: "2024-08-08T16:45:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-08",
    item: "Gas",
    total_amount: 38.2,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    created_at: "2024-08-07T12:30:00Z",
    updated_at: "2024-08-07T12:30:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-07",
    item: "Lunch",
    total_amount: 12.99,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440011",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440011",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    created_at: "2024-08-06T19:00:00Z",
    updated_at: "2024-08-06T19:00:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-06",
    item: "Movie tickets",
    total_amount: 24.0,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
  },
];

export default function Board() {
  const handleAddTransaction = () => {
    console.log("Add new transaction");
  };

  return (
    <div className="container min-h-screen">
      <div className="mx-auto max-w-4xl">
        {/* Main transactions board */}
        <div className="board mb-8 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Recent Transactions
            </h2>
            <span className="badge badge-purple">
              {mockTransactions.length} items
            </span>
          </div>

          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4 border-b border-purple-100 pb-3 font-semibold text-white">
              <span>Date</span>
              <span>Item</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
          </div>

          <div className="space-y-2">
            {mockTransactions.map((transaction, index) => (
              <div
                key={transaction.id}
                className="grid grid-cols-4 gap-4 rounded-lg bg-white/90 p-3 transition-all hover:bg-white hover:shadow-md"
              >
                <span className="text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                <span className="font-medium text-gray-800">
                  {transaction.item}
                </span>
                <span className="font-mono font-semibold text-purple-500">
                  ${transaction.total_amount.toFixed(2)}
                </span>
                <span
                  className={`badge ${index % 3 === 0 ? "badge-purple" : index % 3 === 1 ? "badge-orange" : "badge-green"}`}
                >
                  Split {transaction.people_involved}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
          <button
            onClick={handleAddTransaction}
            className="btn-secondary flex items-center gap-2 text-lg"
          >
            <span>➕</span> Add Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
