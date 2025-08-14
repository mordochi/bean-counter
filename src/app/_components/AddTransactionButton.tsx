"use client";
import Button from "@/components/Button";

export default function AddTransactionButton() {
  const handleAddTransaction = () => {
    console.log("Add new transaction");
  };

  return (
    <Button type="secondary" onClick={handleAddTransaction}>
      <span>➕</span> Add Transaction
    </Button>
  );
}
