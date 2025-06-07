import { useState } from "react"
import type { DragEvent, TouchEvent } from "react"
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { VALUES_LIST } from "../data";

interface Cluster {
  id: number;
  name: string;
  values: string[];
}

export function ValueClusters() {
  // take first 15 values for demo
  const initial = VALUES_LIST.slice(0, 15);
  const [unclustered, setUnclustered] = useState(initial)
  const [clusters, setClusters] = useState<Cluster[]>([])
  const [discarded, setDiscarded] = useState<string[]>([])
  const [dragValue, setDragValue] = useState<string | null>(null)

  function resetBoard() {
    setUnclustered(initial)
    setClusters([])
    setDiscarded([])
    setDragValue(null)
  }

  function handleDragStart(v: string) {
    setDragValue(v)
  }

  function handleTouchEnd(e: TouchEvent) {
    if (!dragValue) return
    const t = e.changedTouches[0]
    const target = document.elementFromPoint(t.clientX, t.clientY)
    if (!target) {
      setDragValue(null)
      return
    }
    const clusterEl = target.closest<HTMLElement>("[data-drop-cluster]")
    const newEl = target.closest<HTMLElement>("[data-drop-new-cluster]")
    const trashEl = target.closest<HTMLElement>("[data-drop-trash]")
    if (trashEl) {
      handleDropTrash()
    } else if (clusterEl) {
      const idx = Number(clusterEl.getAttribute("data-drop-cluster"))
      handleDropCluster(idx, e as unknown as DragEvent)
    } else if (newEl) {
      handleDropNewCluster()
    }
    setDragValue(null)
  }

  function removeFromAll(v: string) {
    setUnclustered((u) => u.filter((x) => x !== v));
    setClusters((cs) =>
      cs
        .map((c) => ({ ...c, values: c.values.filter((x) => x !== v) }))
        .filter((c) => c.values.length > 0)
    );
  }

  function handleDropCluster(index: number, e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!dragValue) return;
    removeFromAll(dragValue);
    setClusters((cs) => {
      const copy = cs.map((c) => ({ ...c, values: [...c.values] }));
      copy[index].values.push(dragValue);
      return copy;
    });
    setDragValue(null);
  }

  function handleDropNewCluster() {
    if (!dragValue) return;
    const limitReached =
      clusters.length >= 7 && !clusters.some((c) => c.values.length === 0);
    if (limitReached) {
      setDragValue(null);
      return;
    }
    removeFromAll(dragValue);
    setClusters((cs) => {
      const empty = cs.find((c) => c.values.length === 0);
      if (empty) {
        return cs.map((c) =>
          c.id === empty.id ? { ...c, values: [dragValue!] } : c
        );
      }
      return [...cs, { id: Date.now(), name: "", values: [dragValue!] }];
    });
    setDragValue(null);
  }

  function handleDropTrash() {
    if (!dragValue) return;
    removeFromAll(dragValue);
    setDiscarded((d) => [dragValue!, ...d]);
    setDragValue(null);
  }

  function handleUndo() {
    const [v, ...rest] = discarded;
    if (!v) return;
    setDiscarded(rest);
    setUnclustered((u) => [v, ...u]);
  }

  const clustersValid = clusters.length >= 4 && clusters.length <= 7
  const allNamed = clusters.every((c) => c.name.trim().length > 0)
  const completed = clustersValid && allNamed && unclustered.length === 0
  const invalidClusterCount = !clustersValid

  return (
    <div className="h-dvh md:h-screen p-4 flex flex-col gap-4 overflow-hidden">
      <header className="flex items-center justify-between gap-4">
        <div className={`font-semibold relative group ${invalidClusterCount ? 'text-red-600' : ''}`}> 
          Clusters: {clusters.length} / 7
          {invalidClusterCount && (
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-5 text-xs hidden group-hover:block">
              Must have between 4 and 7 clusters
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={resetBoard}>Refresh</Button>
          <Button disabled={!completed}>Next</Button>
        </div>
      </header>
      <div className="flex-1 min-h-0 grid grid-cols-1 sm:grid-cols-5 gap-4 overflow-y-auto">
        <section className="col-span-1 flex flex-col gap-2 overflow-auto">
          <h2 className="font-medium">Values</h2>
          <div className="flex flex-col gap-2">
            {unclustered.map((v) => (
              <div
                key={v}
                draggable
                onDragStart={() => handleDragStart(v)}
                onTouchStart={() => handleDragStart(v)}
                onTouchEnd={handleTouchEnd}
                className="w-[120px] h-[60px] bg-slate-50 rounded-md shadow flex items-center justify-center cursor-move"
              >
                {v}
              </div>
            ))}
          </div>
        </section>
        <section
          data-drop-new-cluster
          className="col-span-3 flex flex-wrap gap-4 border rounded-md p-4 min-h-[240px] relative overflow-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropNewCluster}
        >
          {clusters.map((cluster, i) => (
            <div
              key={cluster.id} data-drop-cluster={i}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropCluster(i, e)}
              className="min-w-[150px] p-2 bg-slate-100 rounded-md flex flex-col gap-2"
            >
              <Input
                value={cluster.name}
                placeholder="Click to name..."
                onChange={(e) => {
                  const value = e.target.value;
                  setClusters((cs) =>
                    cs.map((c) =>
                      c.id === cluster.id ? { ...c, name: value } : c
                    )
                  );
                }}
              />
              {cluster.values.map((v) => (
                <div
                  key={v}
                  draggable
                  onDragStart={() => handleDragStart(v)}
                  onTouchStart={() => handleDragStart(v)}
                  onTouchEnd={handleTouchEnd}
                  className="w-[120px] h-[60px] bg-white rounded shadow text-sm flex items-center justify-center cursor-move"
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </section>
        <section
          data-drop-trash
          className="col-span-1 flex flex-col items-center gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropTrash}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`w-[120px] h-[120px] bg-red-100 rounded flex items-center justify-center transition-all duration-300 sm:opacity-100 sm:translate-y-0 ${dragValue ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none sm:pointer-events-auto'}`}
          >
            Trash
          </div>
          {discarded.length > 0 && (
            <Button size="sm" onClick={handleUndo}>
              Undo
            </Button>
          )}
        </section>
      </div>
    </div>
  );
}
