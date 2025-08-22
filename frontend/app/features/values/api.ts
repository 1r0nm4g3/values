export interface BinItem {
  value: string
  bin: number
}

export async function submitBins(items: BinItem[]) {
  const res = await fetch('/api/v1/bins', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  })
  if (!res.ok) {
    console.error('Failed to submit bins')
  }
}

export interface ClusterPayload {
  name: string
  values: string[]
}

export async function submitClusters(clusters: ClusterPayload[]) {
  const res = await fetch('/api/v1/clusters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clusters }),
  })
  if (!res.ok) {
    console.error('Failed to submit clusters')
  }
}

export interface PromptAnswers {
  q1: string
  q2: string
  q3: string
}

export async function submitPrompts(data: PromptAnswers) {
  const res = await fetch('/api/v1/prompts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    console.error('Failed to submit prompts')
  }
}

export interface RefinementPayload {
  cluster: number
  name: string
  q1: string
}

export async function submitRefinement(data: RefinementPayload) {
  const res = await fetch('/api/v1/refinements', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    console.error('Failed to submit refinement')
  }
}
