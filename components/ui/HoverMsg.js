import { cn } from "@/lib/utils";

export default function HoverMsg({ msg, children }) {
  return (
    <span className="relative group">
      <span
        className={cn(
          "z-[9999]",
          "whitespace-nowrap",
          "rounded",
          "bg-gray-300",
          "px-2",
          "py-1",
          "text-black",
          "absolute",
          "-top-10",
          "left-1/2",
          "-translate-x-1/2",
          "before:content-['']",
          "before:absolute",
          "before:-translate-x-1/2",
          "before:left-1/2",
          "before:top-full",
          "before:border-4",
          "before:border-transparent",
          "before:border-t-gray-300",
          "opacity-0",
          "group-hover:opacity-100",
          "transition",
          "pointer-events-none",
        )}
      >
        {msg}
      </span>
      {children}
    </span>
  );
}
