'use client'

import { JSONContent } from 'novel'

type EditorProps = {
  initialValue?: JSONContent
  onChange: (value: JSONContent) => void
}

export default function Editor({ initialValue, onChange }: EditorProps) {
  return <div>Editor</div>
}
