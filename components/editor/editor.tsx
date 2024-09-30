'use client'

import { defaultExtensions } from '@/components/editor/extensions'
import TextButtons from '@/components/editor/selectors/text-buttons'
import { EditorBubble, EditorContent, EditorRoot, JSONContent } from 'novel'

const extensions = [...defaultExtensions]

type EditorProps = {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  return (
    <EditorRoot>
      <EditorContent
        className='border p-4 rounded-xl'
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          attributes: {
            class:
              'prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full',
          },
        }}
        onUpdate={({ editor }) => {
          onChange(editor.getJSON())
        }}
      >
        <EditorBubble
          tippyOptions={{ placement: 'top' }}
          className='flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl'
        >
          <TextButtons />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
