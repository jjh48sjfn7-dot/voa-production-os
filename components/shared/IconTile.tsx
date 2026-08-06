import { departmentAccents } from "@/lib/theme";

interface IconTileProps {
  emoji: string;
}

export function IconTile({ emoji }: IconTileProps) {
  const colors = departmentAccents.audio;

  return (
    <div
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ring-1 ring-white/[0.06] ${colors.iconBg}`}
    >
      <span className="text-[2.5rem] leading-none">{emoji}</span>
    </div>
  );
}
