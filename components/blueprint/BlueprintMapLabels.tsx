/** Restrained zone labels */

export function BlueprintMapLabels() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none">
      <p className="absolute text-[5px] font-medium uppercase tracking-[0.1em] text-slate-600/70 sm:text-[7px]" style={{ left: "7%", top: "14%" }}>
        Stage Left
      </p>
      <p className="absolute left-1/2 -translate-x-1/2 text-[5px] font-medium uppercase tracking-[0.1em] text-slate-600/70 sm:text-[7px]" style={{ top: "14%" }}>
        Center Stage
      </p>
      <p className="absolute text-right text-[5px] font-medium uppercase tracking-[0.1em] text-slate-600/70 sm:text-[7px]" style={{ right: "7%", top: "14%" }}>
        Stage Right
      </p>
      <p className="absolute left-1/2 -translate-x-1/2 text-[5px] font-medium uppercase tracking-[0.08em] text-slate-600/55 sm:text-[7px]" style={{ top: "58%" }}>
        Audience
      </p>
    </div>
  );
}
