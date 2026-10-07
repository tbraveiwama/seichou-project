import { textSize } from "@/lib/textStyle";

export default function Button({
  backGroundColor,
  textColor,
  onClick,
  children,
}) {
  const bgClasses = {
    orange: "bg-orange-400",
    sky: "bg-sky-300",
    gray: "bg-gray-300",
    red: "bg-red-500",
  };
  const hoverClasses = {
    orange: "hover:bg-orange-600",
    sky: "hover:bg-sky-500",
    gray: "hover:bg-gray-500",
    red: "hover:bg-red-700",
  };
  const textClasses = {
    white: "text-white",
    black: "text-black",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${bgClasses[backGroundColor]} rounded-full shadow-md ${textClasses[textColor]} cursor-pointer ${hoverClasses[backGroundColor]} shrink-0 h-8 lg:h-10 w-20 ${textSize.lg} lg:w-30`}
    >
      {children}
    </button>
  );
}
