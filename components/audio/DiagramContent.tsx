"use client";

import { useMemo, useState } from "react";
import { Map as MapIcon } from "lucide-react";
import { AudioPageShell } from "@/components/audio/AudioPageShell";
import { ContentBlockRenderer } from "@/components/audio/ContentBlockRenderer";
import {
  DIAGRAM_STORAGE_ID,
  diagramBlocks,
  getDiagramChecklistIds,
  signalConnections,
  signalNodes,
} from "@/data/audio/diagram";
import { useChecklist } from "@/hooks/useChecklist";
import { useProgress } from "@/hooks/useProgress";
import { calculateProgress } from "@/lib/progress";
import { loadCheckedItems } from "@/lib/storage";
import { audioStyles } from "@/lib/audio-styles";
import { departmentAccents } from "@/lib/theme";
import { voaLabels, voaVenue } from "@/data/audio/venue";
import { SectionHeader } from "@/components/ui/PageHeader";

const ZONE_ORDER = ["stage", "stagebox", "tf5", "router", "ap", "amps", "foh", "sub", "monitors"] as const;

export function DiagramContent() {
  const { checked, toggleItem } = useChecklist(DIAGRAM_STORAGE_ID);
  const itemIds = getDiagramChecklistIds();
  const progress = useProgress(itemIds, checked);
  const colors = departmentAccents.audio;
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodesByZone = useMemo(() => {
    const map = new Map(signalNodes.map((n) => [n.id, n]));
    return ZONE_ORDER.map((id) => map.get(id)).filter(Boolean);
  }, []);

  function loadProgress() {
    return calculateProgress(loadCheckedItems(DIAGRAM_STORAGE_ID), itemIds);
  }

  function isConnected(nodeId: string) {
    if (!hoveredNode) return false;
    return signalConnections.some(
      (c) =>
        (c.from === hoveredNode && c.to === nodeId) ||
        (c.from === nodeId && c.to === hoveredNode)
    );
  }

  return (
    <AudioPageShell
      title="System Diagram"
      description={`${voaVenue.church} signal topology — ${voaLabels.rio}, ${voaLabels.tf5}, ${voaLabels.qscMains}, JBL SRX mains, and ${voaLabels.foh} monitor path.`}
      icon={MapIcon}
      breadcrumbs={[
        { label: voaLabels.audioDepartment, href: "/audio" },
        { label: "System Diagram" },
      ]}
      progress={{
        stats: progress,
        loadFromStorage: loadProgress,
        title: "Connection Check Progress",
        description: "Verify signal path before sound check",
      }}
    >
      <section>
        <SectionHeader
          title="System Topology"
          description="Hover nodes to highlight connections"
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-8">
          {/* Left column: Stage → TF5 */}
          <div className="space-y-3">
            <p className={audioStyles.label}>Input Path</p>
            {nodesByZone.slice(0, 3).map((node) => {
              if (!node) return null;
              return (
                <TopologyCard
                  key={node.id}
                  node={node}
                  colors={colors}
                  active={hoveredNode === node.id || isConnected(node.id)}
                  onHover={setHoveredNode}
                  connection={signalConnections.find((c) => c.from === node.id)}
                />
              );
            })}
          </div>

          {/* Center: Network */}
          <div className="hidden space-y-3 lg:block">
            <p className={audioStyles.label}>Network</p>
            {nodesByZone.slice(3, 5).map((node) => {
              if (!node) return null;
              return (
                <TopologyCard
                  key={node.id}
                  node={node}
                  colors={colors}
                  active={hoveredNode === node.id || isConnected(node.id)}
                  onHover={setHoveredNode}
                  connection={signalConnections.find((c) => c.from === node.id)}
                />
              );
            })}
          </div>

          {/* Right column: Output path */}
          <div className="space-y-3">
            <p className={audioStyles.label}>Output Path</p>
            {nodesByZone.slice(5).map((node) => {
              if (!node) return null;
              return (
                <TopologyCard
                  key={node.id}
                  node={node}
                  colors={colors}
                  active={hoveredNode === node.id || isConnected(node.id)}
                  onHover={setHoveredNode}
                  connection={signalConnections.find((c) => c.from === node.id)}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile network row */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
          {nodesByZone.slice(3, 5).map((node) => {
            if (!node) return null;
            return (
              <TopologyCard
                key={node.id}
                node={node}
                colors={colors}
                active={hoveredNode === node.id || isConnected(node.id)}
                onHover={setHoveredNode}
                connection={signalConnections.find((c) => c.from === node.id)}
              />
            );
          })}
        </div>

        {/* Connection legend */}
        <div className="mt-8 flex flex-wrap gap-2">
          {signalConnections.map((conn) => (
            <span
              key={`${conn.from}-${conn.to}`}
              className="rounded-full bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400 ring-1 ring-white/[0.06]"
            >
              {conn.label}
            </span>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader title="Verification Checklists" />
        <ContentBlockRenderer
          blocks={diagramBlocks}
          storageId={DIAGRAM_STORAGE_ID}
          checked={checked}
          onToggle={toggleItem}
        />
      </section>
    </AudioPageShell>
  );
}

function TopologyCard({
  node,
  colors,
  active,
  onHover,
  connection,
}: {
  node: (typeof signalNodes)[0];
  colors: (typeof departmentAccents)["audio"];
  active: boolean;
  onHover: (id: string | null) => void;
  connection?: (typeof signalConnections)[0];
}) {
  const Icon = node.icon;

  return (
    <div
      className={`group relative ${audioStyles.glass} p-4 transition-all duration-500 ${
        active
          ? `-translate-y-0.5 ring-1 ring-red-500/30 shadow-lg shadow-red-500/10 ${colors.glow}`
          : "hover:-translate-y-0.5 hover:ring-1 hover:ring-white/[0.12]"
      }`}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex items-start gap-3">
        {Icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
              active ? colors.iconBg : "bg-white/[0.04]"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "" : "text-slate-400"}`} />
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-slate-100">{node.label}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{node.description}</p>
          {node.outputs && node.outputs.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {node.outputs.map((out) => (
                <span
                  key={out}
                  className="rounded-md bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-slate-400"
                >
                  → {out}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {connection && (
        <div className="mt-3 border-t border-white/[0.04] pt-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
          ↓ {connection.label}
        </div>
      )}
    </div>
  );
}
