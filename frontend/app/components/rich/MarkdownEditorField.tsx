import { useRef, useMemo } from "react";
import { Controller, useFormContext, type Control } from "react-hook-form";

import { useDebounce } from "~/lib/useDebounce";

import {
  MDXEditor,
  type MDXEditorMethods,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  toolbarPlugin,
  thematicBreakPlugin,
  tablePlugin,
  linkDialogPlugin,
  UndoRedo,
  Separator,
  BoldItalicUnderlineToggles,
  ListsToggle,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import {
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "~/components/ui/form";

interface MarkdownEditorFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  description?: string;
  placeholder?: string;
}

export const MarkdownEditorField = ({
  name,
  control,
  label,
  description,
  placeholder = "Write some markdown…",
}: MarkdownEditorFieldProps) => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const { setValue } = useFormContext();
  const debouncedSave = useDebounce(
    (md: string) => setValue(name, md, { shouldDirty: true }),
    400
  );

  const plugins = useMemo(
    () => [
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
        ),
      }),
      tablePlugin(),
      headingsPlugin(),
      listsPlugin(),
      quotePlugin(),
      linkDialogPlugin(),
      thematicBreakPlugin(),
    ],
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="rounded border border-slate-200">
              <MDXEditor
                ref={editorRef}
                markdown={field.value}
                onChange={debouncedSave}
                onBlur={() => {
                  field.onBlur();
                  const md = editorRef.current?.getMarkdown() ?? "";
                  setValue(name, md, { shouldDirty: true });
                }}
                placeholder={placeholder}
                contentEditableClassName="prose prose-slate min-h-[160px] p-4"
                plugins={plugins}
              />
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
