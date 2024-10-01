'use client'

import { defaultExtensions } from '@/components/editor/extensions'
import LinkSelector from '@/components/editor/selectors/link-selector'
import TextButtons from '@/components/editor/selectors/text-buttons'
import { Separator } from '@/components/ui/separator'
import { EditorBubble, EditorContent, EditorRoot, JSONContent } from 'novel'
import { useState } from 'react'

const extensions = [...defaultExtensions]

type EditorProps = {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [openLink, setOpenLink] = useState(false)

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
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation='vertical' className='h-auto' />
          <TextButtons />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
