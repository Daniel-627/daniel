"use client";

export default function DeleteButton() {
  return (
    <button
      type="submit"
      onClick={(e) => {
        if (!confirm("Delete this message permanently?")) e.preventDefault();
      }}
      className="pill rounded-full border border-border px-3.5 py-1.5 text-[13px] text-text-secondary"
    >
      Delete
    </button>
  );
}
