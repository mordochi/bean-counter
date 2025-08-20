"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";

interface BoardNameModalProps {
  isOpen: boolean;
  onConfirm: (boardName: string) => void;
  onClose: () => void;
}

export default function BoardNameModal({
  isOpen,
  onConfirm,
  onClose,
}: BoardNameModalProps) {
  const [boardName, setBoardName] = useState("");

  const resetModal = () => {
    setBoardName("");
  };

  useEffect(() => {
    if (!isOpen) resetModal();
  }, [isOpen]);

  const handleConfirm = () => {
    if (boardName.trim()) {
      onConfirm(boardName.trim());
    }
  };

  const handleClose = () => {
    onClose();
    resetModal();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="mx-4 max-w-md min-w-[400px] rounded-3xl border border-white/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(228,213,255,0.9) 100%)",
          boxShadow:
            "0 25px 50px rgba(157, 0, 255, 0.15), 0 0 0 1px rgba(157, 0, 255, 0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-gradient mb-6 text-center text-2xl font-bold">
          Name Your Shared Board
        </h3>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Enter board name (e.g., 'Vacation', 'Groceries')"
          className="input-field mb-6 w-full text-lg"
          autoFocus
          onKeyPress={(e) => e.key === "Enter" && handleConfirm()}
        />
        <div className="flex justify-end gap-3">
          <Button type="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleConfirm}
            disabled={!boardName.trim()}
          >
            Create Board
          </Button>
        </div>
      </div>
    </div>
  );
}
