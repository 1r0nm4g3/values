import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { MarkdownEditorField } from "~/components/rich/MarkdownEditorField"

import { Button } from "~/components/ui/button"
import {
  Form,
} from "~/components/ui/form"

interface Prompt {
  id: number
  prompt: string
}

const ValueQuestionSchema = z.object({
  q1: z.string().min(1, "Required"),
  q2: z.string().min(1, "Required"),
  q3: z.string().min(1, "Required"),
})

type ValueQuestionAnswers = z.infer<typeof ValueQuestionSchema>

const API_BASE = "http://localhost:8001"

export function ValuePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>([])

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/journal/prompts`)
      .then((res) => res.json())
      .then(setPrompts)
      .catch(() => {})
  }, [])

  const form = useForm<ValueQuestionAnswers>({
    resolver: zodResolver(ValueQuestionSchema),
    defaultValues: {
      q1: "",
      q2: "",
      q3: "",
    },
  })

  function onSubmit(answers: ValueQuestionAnswers) {
    prompts.forEach((p, index) => {
      const key = `q${index + 1}` as keyof ValueQuestionAnswers
      const response = answers[key]
      fetch(`${API_BASE}/api/v1/journal/prompt/${p.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }),
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-7xl">
        {prompts.map((p, index) => (
          <MarkdownEditorField
            key={p.id}
            name={`q${index + 1}` as const}
            control={form.control}
            label={`${index + 1}. ${p.prompt}`}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
