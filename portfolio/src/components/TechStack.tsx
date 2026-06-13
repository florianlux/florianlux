import type { StackGroup } from "@/app/site-data";

type TechStackProps = {
  groups: StackGroup[];
};

export default function TechStack({ groups }: TechStackProps) {
  return (
    <div>
      <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.3em] text-white/28">
        System inputs
      </p>
      {groups.map((group) => (
        <div
          key={group.title}
          className="grid items-baseline gap-2.5 border-b border-white/[0.045] py-4 first:border-t lg:grid-cols-[170px_minmax(0,1fr)]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/36">
            {group.title}
          </p>
          <p className="text-[14px] leading-[1.66] text-white/50">
            {group.items.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}
