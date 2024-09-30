'use client'

import { EditorContent, EditorRoot, JSONContent } from 'novel'
import { StarterKit } from 'novel/extensions'

const extensions = [StarterKit]

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
      ></EditorContent>
    </EditorRoot>
  )
}
