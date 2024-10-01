'use client'

import { defaultExtensions } from '@/components/editor/extensions'
import ColorSelector from '@/components/editor/selectors/color-selector'
import LinkSelector from '@/components/editor/selectors/link-selector'
import NodeSelector from '@/components/editor/selectors/node-selector'
import TextButtons from '@/components/editor/selectors/text-buttons'
import {
  slashCommand,
  suggestionItems,
} from '@/components/editor/slash-command'
import { Separator } from '@/components/ui/separator'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  JSONContent,
} from 'novel'
import { handleCommandNavigation } from 'novel/extensions'
import { useState } from 'react'

const extensions = [...defaultExtensions, slashCommand]

type EditorProps = {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  const [openLink, setOpenLink] = useState(false)
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)

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
        <EditorCommand className='z-50 h-auto max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all'>
          <EditorCommandEmpty className='px-2 text-muted-foreground'>
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent `}
                key={item.title}
              >
                <div className='flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background'>
                  {item.icon}
                </div>
                <div>
                  <p className='font-medium'>{item.title}</p>
                  <p className='text-xs text-muted-foreground'>
                    {item.description}
                  </p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubble
          tippyOptions={{ placement: 'top' }}
          className='flex w-fit max-w-[90vw] overflow-hidden rounded-md border border-muted bg-background shadow-xl'
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <Separator orientation='vertical' className='h-auto' />
          <LinkSelector open={openLink} onOpenChange={setOpenLink} />
          <Separator orientation='vertical' className='h-auto' />
          <TextButtons />
          <Separator orientation='vertical' className='h-auto' />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
