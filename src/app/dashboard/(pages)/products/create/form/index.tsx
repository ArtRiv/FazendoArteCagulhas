'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CustomCurrencyInput } from "./price-input"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategoriesSheet } from "./categories-sheet"
import { useCategories } from "@/hooks/use-categories"
import { Category } from "@/types/categories"


const FormSchema = z.object({
    product_name: z.string().min(2, {
        message: 'Nome deve conter pelo menos 2 caractéres'
    }),
    description: z.string().min(2, {
        message: 'Descrição deve conter pelo menos 2 caractéres'
    }),
    price: z.number().min(1, {
        message: 'Preço deve conter pelo menos 1 número'
    }),
    category: z.string({
        required_error: "Selecione uma categoria.",
    })
});

export const ProductForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            product_name: "",
            description: "",
            price: 0,
        }
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "Produto adicionado com sucesso",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            )
        })
    }

    const { data, isLoading, error } = useCategories();
    const categories: Category[] = data || [];

    return (
        <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
                <CardTitle>Informações do Produto</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid space-y-6">
                        <FormField
                            control={form.control}
                            name="product_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nome do produto, visível para os clientes." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descrição</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Descrição do produto, visível na página do produto." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Preço</FormLabel>
                                    <FormControl>
                                        <CustomCurrencyInput value={field.value} onChange={field.onChange} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Escolha uma categoria para o produto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={category.name}
                                                    className="cursor-pointer"
                                                    value={category.name}
                                                >
                                                    {category.name.toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        <CategoriesSheet />
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}