import { useState } from "react";
import type { DragEvent } from "react";
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
  const [unclustered, setUnclustered] = useState(initial);
  const [clusters, setClusters] = useState<Cluster[]>([]);
  const [discarded, setDiscarded] = useState<string[]>([]);
  const [dragValue, setDragValue] = useState<string | null>(null);

  function handleDragStart(v: string) {
    setDragValue(v);
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

  const completed =
    clusters.length >= 5 && clusters.length <= 7 && unclustered.length === 0;

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div className="font-semibold">
          Clusters: {clusters.length} / 7
        </div>
        <Button disabled={!completed}>Next</Button>
      </header>
      <div className="flex-1 grid grid-cols-5 gap-4">
        <section className="col-span-1 flex flex-col gap-2">
          <h2 className="font-medium">Values</h2>
          <div className="flex flex-col gap-2">
            {unclustered.map((v) => (
              <div
                key={v}
                draggable
                onDragStart={() => handleDragStart(v)}
                className="w-[120px] h-[60px] bg-slate-50 rounded-md shadow flex items-center justify-center cursor-move"
              >
                {v}
              </div>
            ))}
          </div>
        </section>
        <section className="col-span-3 flex flex-wrap gap-4 border rounded-md p-4 min-h-[300px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropNewCluster}
        >
          {clusters.map((cluster, i) => (
            <div
              key={cluster.id}
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
                  className="w-[120px] h-[60px] bg-white rounded shadow text-sm flex items-center justify-center cursor-move"
                >
                  {v}
                </div>
              ))}
            </div>
          ))}
        </section>
        <section
          className="col-span-1 flex flex-col items-center gap-2"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropTrash}
        >
          <div className="w-[96px] h-[96px] bg-red-100 rounded flex items-center justify-center">
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
