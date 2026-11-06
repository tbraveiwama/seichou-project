import { textSize } from "@/lib/textStyle";

export default function Button({
  backGroundColor,
  textColor,
  onClick,
  children,
  isActive = true,
  ...props
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

  // 非アクティブ時は gray / white に固定
  const bg = isActive ? backGroundColor : "gray";
  const text = isActive ? textColor : "white";

  return (
    <button
      type="button"
      onClick={isActive ? onClick : undefined}
      className={`${bgClasses[bg]} ${hoverClasses[bg]} ${textClasses[text]} rounded-full shadow-md cursor-pointer shrink-0 h-8 lg:h-10 w-20 lg:w-30 ${textSize.base} font-bold`}
      {...props}
    >
      {children}
    </button>
  );
}
