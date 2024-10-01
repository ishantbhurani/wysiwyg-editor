import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { nodeItems } from '@/lib/data'
import { Check, ChevronDown } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'

type NodeSelectorProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function NodeSelector({
  open,
  onOpenChange,
}: NodeSelectorProps) {
  const { editor } = useEditor()
  if (!editor) return null

  const activeItem = nodeItems
    .filter((item) => item.isActive(editor))
    .pop() ?? {
    name: 'Multiple',
  }

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger
        asChild
        className='gap-2 rounded-none border-none hover:bg-accent focus:ring-0'
      >
        <Button size='sm' variant='ghost' className='gap-2'>
          <span className='whitespace-nowrap text-sm'>{activeItem.name}</span>
          <ChevronDown className='w-4 h-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} align='start' className='w-48 p-1'>
        {nodeItems.map((item, index) => (
          <EditorBubbleItem
            key={index}
            onSelect={(editor) => {
              item.command(editor)
              onOpenChange(false)
            }}
            className='flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent'
          >
            <div className='flex items-center space-x-2'>
              <div className='rounded-sm border p-1'>
                <item.icon className='w-3 h-3' />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className='w-4 h-4' />}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
