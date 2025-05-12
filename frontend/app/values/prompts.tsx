import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRef } from "react"

import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  thematicBreakPlugin,
  BlockTypeSelect,
  tablePlugin,
  CreateLink,
  InsertTable,
  ListsToggle,
  Separator,
  linkDialogPlugin
} from "@mdxeditor/editor"
import "@mdxeditor/editor/style.css"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  text: z.string().min(0).max(10000)
})


export function ValuePrompts() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      text: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const ref = useRef<MDXEditorMethods>(null)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <div className="rounded border border-slate-200 max-w-7xl">
                  <MDXEditor
                    markdown={field.value}
                    ref={ref}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    placeholder="Your text here"
                    contentEditableClassName="prose prose-slate"
                    plugins={[
                      toolbarPlugin({
                        toolbarContents: () => (
                          <>
                            <UndoRedo />
                            <Separator />
                            <BoldItalicUnderlineToggles />
                            <Separator />
                            <ListsToggle />
                            <Separator />
                            <BlockTypeSelect />
                            <Separator />
                            <CreateLink />
                            <Separator />
                            <InsertTable />
                          </>
                        )
                      }),
                      tablePlugin(),
                      headingsPlugin(),
                      listsPlugin(),
                      quotePlugin(),
                      linkDialogPlugin(),
                      thematicBreakPlugin()]}
                  />
                </div>
              </FormControl>
              <FormDescription>
                This is your text.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form >
  )
}
