"use client"
import { Upload } from "lucide-react"
import { useState } from "react"

type UploadFileProps = {
    selectedFile?: File | null,
    setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>,
    id: string, // <-- Add this
}
const SelectFile: React.FC<UploadFileProps> = ({
    selectedFile,
    setSelectedFile,
    id, 
}) => {
    const [preview, setPreview] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className='flex flex-col gap-4 p-4'>
            <div className={`border-2 border-dashed border-slate-400 rounded-lg p-2 transition-all
        ${preview ? 'bg-indigo-100' : 'hover:bg-indigo-50'}`}>
                <input
                    type="file"
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className='hidden'
                    id={id} // 🔧 Use dynamic id
                />
                <label htmlFor={id} className='cursor-pointer'>
                    {preview ? (
                        <div className='flex flex-col items-center gap-4'>
                            <img src={preview} alt="Preview" className='max-h-28 rounded-lg object-contain' />
                            <p className='text-sm text-gray-400'>Click to change file</p>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-4'>
                            <Upload className='w-12 h-12 text-slate-500' />
                            <div className='text-center'>
                                <p className='text-sm font-medium'>Click to upload</p>
                                <p className='text-xs text-gray-400'>PNG, JPG,PDF (max. 20MB)</p>
                            </div>
                        </div>
                    )}
                </label>
            </div>
        </div>
    )
}

export default SelectFile