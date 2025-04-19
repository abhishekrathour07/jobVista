'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'



const EditjobDrawer = () => {
    const form = useForm<any>({
        defaultValues: {
            fullName: '',
            email: '',
            resume: undefined,
            message: '',
            phone: ''
        }
    })

    const onSubmit = (data: any) => {
        console.log('Form Submitted:', data)
    }

    return (
       <div>

       </div>
    )
}

export default EditjobDrawer
