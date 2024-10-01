'use client'

import { useLocalStorage } from '@/hooks/useLocalStorage'
import dynamic from 'next/dynamic'
import { JSONContent } from 'novel'
const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
})

export default function Home() {
  const [content, setContent] = useLocalStorage<JSONContent | null>(
    'content',
    null
  )

  return (
    <main className='container mx-auto'>
      <h1 className='text-3xl font-bold text-center text-zinc-700 my-8'>
        Novel Editor
      </h1>
      <div>
        <Editor
          {...(content && { initialValue: content })}
          onChange={setContent}
        />
      </div>
    </main>
  )
}
