export function Base({ children }) {
  return (
    <div className="flex flex-col items-center px-1 lg:px-0 py-4 lg:p-8">
      <div className="w-full flex flex-col gap-2 max-w-[1000px]">{children}</div>
    </div>
  );
}
