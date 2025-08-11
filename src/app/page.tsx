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
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    created_at: "2024-08-09T14:15:00Z",
    updated_at: "2024-08-09T14:15:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-09",
    item: "Coffee",
    total_amount: 4.50,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440011",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440011"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    created_at: "2024-08-08T16:45:00Z",
    updated_at: "2024-08-08T16:45:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-08",
    item: "Gas",
    total_amount: 38.20,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010"
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
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440011"
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    created_at: "2024-08-06T19:00:00Z",
    updated_at: "2024-08-06T19:00:00Z",
    shared_board_id: "550e8400-e29b-41d4-a716-446655440000",
    date: "2024-08-06",
    item: "Movie tickets",
    total_amount: 24.00,
    people_involved: 2,
    paid_by_user_id: "550e8400-e29b-41d4-a716-446655440010",
    added_by_user_id: "550e8400-e29b-41d4-a716-446655440010"
  }
];

export default function Home() {
  const handleAddTransaction = () => {
    console.log("Add new transaction");
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 mt-8">Bean Counter</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-300 dark:border-gray-600 p-6 mb-8 shadow-sm">
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-200 dark:border-gray-600 font-semibold">
              <span>Date</span>
              <span>Item</span>
              <span>Amount</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-3 gap-4 py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
                <span className="text-gray-700 dark:text-gray-300">{transaction.date}</span>
                <span className="text-gray-900 dark:text-gray-100">{transaction.item}</span>
                <span className="text-gray-700 dark:text-gray-300 font-mono">${transaction.total_amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleAddTransaction}
            className="bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg px-8 py-3 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
}
