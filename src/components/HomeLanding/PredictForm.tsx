
"use client"
import React, { useState } from 'react'


import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// news to predict true /false
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
    TextInput: z.string().min(50).max(100000),
})

const PredictForm = () => {
    const [loading, setLoading] = useState(false);
    const [result, setresult] = useState("")


    const SOURCE_URL = process.env.NEXT_PUBLIC_API_URL;




    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            TextInput: "",
        },
    })


    //   submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        if (!values) return alert("Todo input must not be empty");

        // prevent this error  Error creating todo item: SyntaxError: Unexpected token 'h', "hello_world" is not valid JSON

        const data = {
            "text": values.TextInput
        }
        console.log("data", data, typeof (data));


        try {
            const response = await fetch(`http://localhost:8000/api/predict`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("result", result);
            setresult(result.result)
            return result;
        } catch (error) {
            // PredictData.tsx:31 Error creating todo item: SyntaxError: Unexpected token 'h', "hello_world" is not valid JSON

            console.error("Error creating todo item:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=' flex flex-col  space-y-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex md:flex-row flex-col  gap-2">
                    <FormField
                        control={form.control}
                        name="TextInput"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Add article</FormLabel>
                                <FormControl>
                                    <Input placeholder="predict" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Enter the article to predict
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant="ghost">Submit</Button>
                </form>
            </Form>
            <div>
            <div className='flex  flex-col gap-3'>
                <strong>
                    Result
                </strong>
                <p>
                    {result}
                </p>
            </div>
            </div>
        </div>
    )
}

export default PredictForm