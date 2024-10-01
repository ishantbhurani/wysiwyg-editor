import { Button } from '@/components/ui/button'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { cn, getUrlFromString } from '@/lib/utils'
import { Check, Trash } from 'lucide-react'
import { useEditor } from 'novel'
import { useEffect, useRef } from 'react'

type LinkSelectorProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LinkSelector({
  open,
  onOpenChange,
}: LinkSelectorProps) {
  const { editor } = useEditor()
  const inputRef = useRef<HTMLInputElement>(null)

  if (!editor) return null

  useEffect(() => {
    inputRef.current?.focus()
  })

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const target = e.currentTarget as HTMLFormElement
    const input = target[0] as HTMLInputElement
    const url = getUrlFromString(input.value)
    if (url) {
      editor?.chain().focus().setLink({ href: url }).run()
      onOpenChange(false)
    }
  }

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          size='sm'
          variant='ghost'
          className='gap-2 rounded-none border-none'
        >
          <p className='text-base'>↗</p>
          <p
            className={cn('underline decoration-stone-400 underline-offset-4', {
              'text-blue-500': editor.isActive('link'),
            })}
          >
            Link
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-60 p-0' sideOffset={10}>
        <form onSubmit={handleSubmit} className='flex p-1'>
          <input
            id='link'
            type='text'
            ref={inputRef}
            placeholder='Paste a link'
            className='flex-1 bg-background p-1 text-sm outline-none'
            defaultValue={editor.getAttributes('link').href || ''}
          />
          {editor.getAttributes('link').href ? (
            <Button
              key='trash-btn' // key required to prevent form submission, even with type='button'
              size='icon'
              variant='outline'
              type='button'
              className='flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800'
              onClick={() => {
                editor.chain().focus().unsetLink().run()
                onOpenChange(false)
              }}
            >
              <Trash className='w-4 h-4' />
            </Button>
          ) : (
            <Button size='icon' className='h-8'>
              <Check className='w-4 h-4' />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}
