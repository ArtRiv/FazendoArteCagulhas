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
import { CategoriesSheet } from "./categories/categories-sheet"
import { useCategories } from "@/hooks/use-categories"
import { Category } from "@/types/categories"
import { ProductGroupsSheet } from "./product-group/product-group-sheet"
import { useTags } from "@/hooks/use-tags"
import { TagField } from "./tags/tag-field"
import { useProductGroups } from "@/hooks/use-product-group"


const FormSchema = z.object({
    product_name: z.string().min(2, {
        message: 'Nome deve conter pelo menos 2 caractéres.'
    }),
    price: z.number().min(1, {
        message: 'Preço deve conter pelo menos 1 número.'
    }),
    category: z.string({
        required_error: "Selecione uma categoria.",
    }),
    product_group: z.string({
        required_error: "Selecione um grupo de produto."
    }),
    description: z.string(),
    tag: z.array(z.object({
        id: z.number(),
        name: z.string(),
    }))
});

export const ProductForm = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            product_name: "",
            description: "",
            price: 0,
            tag: [{
                id: 1,
                name: 'Genshin Impact'
            }],
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

    const { data: categories = [], isLoading: categoriesIsLoading, error } = useCategories();

    const { data: productGroups = [] } = useProductGroups();


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
                                                <SelectValue placeholder="Escolha uma categoria" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.length === 0 && (
                                                <p className="text-sm text-stone-500">
                                                    Muito vazio, por que não cria uma categoria?
                                                </p>
                                            )}
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
                        <FormField
                            control={form.control}
                            name="product_group"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Grupo de produto</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Escolha um grupo de produto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {/* {isLoading && (
                                                <Skeleton className="w-[100px] h-[30px]" />
                                            )} */}
                                            {productGroups.length === 0 && (
                                                <p className="text-sm text-stone-500">
                                                    Muito vazio, por que não cria um grupo de produto?
                                                </p>
                                            )}
                                            {productGroups.map((group) => (
                                                <SelectItem
                                                    key={group.id}
                                                    className="cursor-pointer"
                                                    value={group.name}
                                                >
                                                    {group.name.toLowerCase()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        <ProductGroupsSheet />
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <TagField control={form.control} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}