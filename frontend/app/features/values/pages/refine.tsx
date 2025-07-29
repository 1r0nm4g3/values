import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { MarkdownEditorField } from "~/components/rich/MarkdownEditorField"

import { Button } from "~/components/ui/button"
import {
	Form,
} from "~/components/ui/form"

const ValueRefinementQuestions = z.object({
	q1: z.string().min(1, "Required"),
})

type ValueRefineAnswers = z.infer<typeof ValueRefinementQuestions>

function ValueRefinePrompts() {
	const form = useForm<ValueRefineAnswers>({
		resolver: zodResolver(ValueRefinementQuestions),
		defaultValues: {
			q1: "**Define this value in your own words.**\n\n\n**What are some examples of this value from your life?**\n\n\n**What are the costs of ignoring this value?**\n\n\n**What are some behaviors that would exhibit this value?**\n\n\n",
		},
	})

	function onSubmit(answers: ValueRefineAnswers) {
		console.log(answers)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-7xl">
				<input type="text" placeholder="Name of Value" />
				<MarkdownEditorField
					name="q1"
					control={form.control}
					label="Write about this value"
				/>
				<Button type="submit">Submit</Button>
			</form>
		</Form >
	)
}

export default function RefineCluster() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-2xl font-bold mb-4">Cluster X</h1>
			<ul>
				<li>Value 1</li>
				<li>Value 2</li>
				<li>Value 3</li>
				<li>Value 4</li>
				<li>Value 5</li>
			</ul>
			<ValueRefinePrompts />
		</div>
	)
}
