import { v2 as cloudinary } from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const results = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: ['wysiwyg-editor-upload'],
        },
        function (error, result) {
          if (error) {
            reject(error)
            return
          }
          resolve(result)
        }
      )
      .end(buffer)
  })

  return NextResponse.json(results)
}
