'use client'

import Editor from '@/components/editor/editor'
import { JSONContent } from 'novel'
import { useState } from 'react'

export default function Home() {
  const [content, setContent] = useState<JSONContent>({})

  return <Editor initialValue={content} onChange={setContent} />
}
