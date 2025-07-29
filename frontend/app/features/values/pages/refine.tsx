import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { MarkdownEditorField } from "~/components/rich/MarkdownEditorField"

import { Button } from "~/components/ui/button"
import { submitRefinement } from "../api";
import { Input } from "~/components/ui/input"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form"

const ValueRefinementQuestions = z.object({
  name: z.string().min(1, "Required"),
  q1: z.string().min(1, "Required"),
})

type ValueRefineAnswers = z.infer<typeof ValueRefinementQuestions>

interface ValueRefinePromptsProps {
  onSubmit: (answers: ValueRefineAnswers) => void
}

function ValueRefinePrompts({ onSubmit }: ValueRefinePromptsProps) {
  const form = useForm<ValueRefineAnswers>({
    resolver: zodResolver(ValueRefinementQuestions),
    defaultValues: {
      name: "",
      q1: `**Define this value in your own words.**


**What are some examples of this value from your life?**


**What are the costs of ignoring this value?**


**What are some behaviors that would exhibit this value?**

`,
    },
  })

  function handleSubmit(answers: ValueRefineAnswers) {
    onSubmit(answers)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 max-w-7xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Value</FormLabel>
              <FormControl>
                <Input placeholder="Name of Value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <MarkdownEditorField
          name="q1"
          control={form.control}
          label="Write about this value"
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

import { VALUES_LIST } from "../data"

export default function RefineCluster() {
  const clusterSize = 5
  const clusters = Array.from(
    { length: Math.ceil(VALUES_LIST.length / clusterSize) },
    (_, i) => ({
      name: `Cluster ${i + 1}`,
      values: VALUES_LIST.slice(i * clusterSize, (i + 1) * clusterSize),
    })
  )

  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<(ValueRefineAnswers & { cluster: number })[]>([])

  async function handleNext(a: ValueRefineAnswers) {
    const entry = { ...a, cluster: index }
    setAnswers((prev) => [...prev, entry])
    await submitRefinement(entry)
    if (index < clusters.length - 1) {
      setIndex((i) => i + 1)
    } else {
    }
  }

  const cluster = clusters[index]

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-4">{cluster.name}</h1>
      <ul>
        {cluster.values.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
      <ValueRefinePrompts key={index} onSubmit={handleNext} />
    </div>
  )
}
