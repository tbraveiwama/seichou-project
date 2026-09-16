export function Base({ children }) {
  return (
    <div className="flex flex-col items-center py-8">
      <div className="w-full max-w-350 flex flex-col gap-2">{children}</div>
    </div>
  );
}
