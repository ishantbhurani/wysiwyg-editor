import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SelectorItem } from '@/types/selector-item'
import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'

export default function TextButtons() {
  const { editor } = useEditor()
  if (!editor) return null

  const items: SelectorItem[] = [
    {
      name: 'bold',
      icon: BoldIcon,
      command: (editor) => editor.chain().focus().toggleBold().run(),
      isActive: (editor) => editor.isActive('bold'),
    },
    {
      name: 'italic',
      icon: ItalicIcon,
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      isActive: (editor) => editor.isActive('italic'),
    },
    {
      name: 'underline',
      isActive: (editor) => editor.isActive('underline'),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      icon: StrikethroughIcon,
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      isActive: (editor) => editor.isActive('strike'),
    },
    {
      name: 'code',
      icon: CodeIcon,
      command: (editor) => editor.chain().focus().toggleCode().run(),
      isActive: (editor) => editor.isActive('code'),
    },
  ]

  return (
    <div className='flex'>
      {items.map((item, index) => (
        <EditorBubbleItem
          key={index}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <Button size='sm' className='rounded-none' variant='ghost'>
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
