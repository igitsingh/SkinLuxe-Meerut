"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import api from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
    restaurantName: z.string().min(2, "Name must be at least 2 characters"),
    contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
    contactEmail: z.string().email("Invalid email address"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    minOrderAmount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, "Amount must be a positive number"),
    operatingHours: z.string().min(1, "Operating hours are required"),
    isOpen: z.boolean().default(true),
})

export default function SettingsPage() {
    const [isLoading, setIsLoading] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            restaurantName: "",
            contactPhone: "",
            contactEmail: "",
            address: "",
            minOrderAmount: "0",
            operatingHours: "",
            isOpen: true,
        },
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            setIsLoading(true)
            const res = await api.get("/settings")
            const data = res.data
            form.reset({
                restaurantName: data.restaurantName || "",
                contactPhone: data.contactPhone || "",
                contactEmail: data.contactEmail || "",
                address: data.address || "",
                minOrderAmount: data.minOrderAmount?.toString() || "0",
                operatingHours: data.operatingHours || "",
                isOpen: data.isOpen,
            })
        } catch (error) {
            toast.error("Failed to fetch settings")
        } finally {
            setIsLoading(false)
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await api.put("/settings", values)
            toast.success("Settings updated successfully")
        } catch (error) {
            toast.error("Failed to update settings")
        }
    }

    if (isLoading) {
        return <div className="p-8">Loading...</div>
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6 bg-slate-50/50 min-h-screen">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h2>
                    <p className="text-slate-500 mt-1">Manage your restaurant configuration.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                        <CardDescription>
                            Update your restaurant's details and operating status.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <FormField
                                        control={form.control}
                                        name="restaurantName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Restaurant Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="The Pizza Box" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+91 9876543210" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="contactEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="contact@example.com" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="minOrderAmount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Minimum Order Amount (₹)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Address</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="123 Main St, City, Country" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="operatingHours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Operating Hours</FormLabel>
                                            <FormControl>
                                                <Input placeholder="10:00 AM - 10:00 PM" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="isOpen"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>Restaurant Open</FormLabel>
                                                <FormDescription>
                                                    Toggle this to temporarily close the restaurant for orders.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />

                                <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                                    Save Changes
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
