'use client'

import { defaultExtensions } from '@/components/editor/extensions'
import LinkSelector from '@/components/editor/selectors/link-selector'
import NodeSelector from '@/components/editor/selectors/node-selector'
import TextButtons from '@/components/editor/selectors/text-buttons'
import { Separator } from '@/components/ui/separator'
import { EditorBubble, EditorContent, EditorRoot, JSONContent } from 'novel'
import { handleCommandNavigation } from 'novel/extensions'
import { useState } from 'react'

const extensions = [...defaultExtensions]

type EditorProps = {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [openLink, setOpenLink] = useState(false)
  const [openNode, setOpenNode] = useState(false)

  return (
    <EditorRoot>
      <EditorContent
        className='border p-4 rounded-xl'
        {...(initialValue && { initialContent: initialValue })}
        extensions={extensions}
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
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
          <Separator orientation='vertical' className='h-auto' />
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation='vertical' className='h-auto' />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation='vertical' className='h-auto' />
          <TextButtons />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
