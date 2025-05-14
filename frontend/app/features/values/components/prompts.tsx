import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { MarkdownEditorField } from "~/components/rich/MarkdownEditorField"

import { Button } from "~/components/ui/button"
import {
  Form,
} from "~/components/ui/form"

const ValueQuestionSchema = z.object({
  q1: z.string().min(1, "Required"),
  q2: z.string().min(1, "Required"),
  q3: z.string().min(1, "Required"),
})

type ValueQuestionAnswers = z.infer<typeof ValueQuestionSchema>

export function ValuePrompts() {
  const form = useForm<ValueQuestionAnswers>({
    resolver: zodResolver(ValueQuestionSchema),
    defaultValues: {
      q1: "",
      q2: "",
      q3: "",
    },
  })

  function onSubmit(answers: ValueQuestionAnswers) {
    console.log(answers)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-7xl">
        <MarkdownEditorField
          name="q1"
          control={form.control}
          label="1. What is a very powerful memory from your past. How has it impacted you and what values were displayed?"
        />
        <MarkdownEditorField
          name="q2"
          control={form.control}
          label="2. Think about someone you look up to and admire. Why? What values does this person emanate?"
        />
        <MarkdownEditorField
          name="q3"
          control={form.control}
          label="3. What are some recurring situations in your life? What values cause these?"
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form >
  )
}
