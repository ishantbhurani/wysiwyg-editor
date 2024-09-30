'use client'

import dynamic from 'next/dynamic'
import { JSONContent } from 'novel'
import { useState } from 'react'
const Editor = dynamic(() => import('@/components/editor/editor'), {
  ssr: false,
})

export default function Home() {
  const [content, setContent] = useState<JSONContent>()

  return (
    <main className='container mx-auto'>
      <h1 className='text-3xl font-bold text-center text-zinc-700 my-8'>
        Novel Editor
      </h1>
      <div>
        <Editor initialValue={content} onChange={setContent} />
      </div>
    </main>
  )
}
