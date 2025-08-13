"use client";
import SecondaryButton from "@/components/SecondaryButton";

export default function AddTransactionButton() {
  const handleAddTransaction = () => {
    console.log("Add new transaction");
  };

  return (
    <SecondaryButton onClick={handleAddTransaction}>
      <span>➕</span> Add Transaction
    </SecondaryButton>
  );
}
