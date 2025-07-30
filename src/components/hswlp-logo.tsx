import { cn } from "@/lib/utils";

const HswlpLogo = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-label="HSWLP logo"
      role="img"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary dark:text-white", className)}
      {...props}
    >
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="80"
        fill="currentColor"
      >
        🧩
      </text>
    </svg>
  );
};

export default HswlpLogo;
