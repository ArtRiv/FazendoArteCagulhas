'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input"
import { CustomCurrencyInput } from "./price-input/price-input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/hooks/use-toast"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagField } from "./tags/tag-field"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"
import { ProductVariation } from "@/types/product-variation";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-product";
import { Category } from "@/types/categories";
import { Product } from "@/types/product";
import { ProductGroup } from "@/types/product-group";
import { CategoryField } from "./categories/category-field";
import { ImageInput } from "./images/input";
import { Tag } from "@/types/tags";
import { ProductGroupField } from "./product-group/product-group-field";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
    title: z.string().min(2, {
        message: 'Nome deve conter pelo menos 2 caracteres.'
    }),
    price: z.number().min(1, {
        message: 'Preço deve conter pelo menos 1 número.'
    }),
    categories: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ) as z.ZodType<Category[]>,
    product_group: z.number({
        required_error: "Selecione um grupo de produto."
    }),
    description: z.string(),
    tag: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
        })
    ) as z.ZodType<Tag[]>,
    status: z.enum(['active', 'draft', 'archived']).default('active'),
    media: z.array(z.string()),
    variations: z.array(
        z.object({
            title: z.string(),
            price: z.number(),
            description: z.string(),
            media: z.array(z.string()),
        })
    ) as z.ZodType<ProductVariation[]>,
});

interface ProductFormProps {
    productData?: {
        product: Product;
        tags: Tag[];
        categories: Category[];
        productGroup: ProductGroup;
    };
}

export const ProductForm = ({ productData, mode }: ProductFormProps & { mode: 'create' | 'update'}) => {

    const {
        product,
        tags = [],
        categories = [],
        productGroup
    } = productData || {};

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: product?.title || "",
            description: product?.description || "",
            price: product?.price || 0,
            tag: tags || [],
            variations: product?.variations || [],
            status: product?.status || 'active',
            media: product?.media || [],
            categories: categories,
            product_group: productGroup?.id,
        }
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "variations",
    });

    const { toast } = useToast();

    const createMutation = useCreateProduct();
    const updateMutation = useUpdateProduct();

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (mode === 'create') {
            createMutation.mutate(data, {
                onSuccess: () => {
                    toast({
                        title: "Produto criado com sucesso",
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                            </pre>
                        ),
                    });
                }
            });
        } else if (mode === 'update') {
            console.log(product?.id);
            updateMutation.mutate({ product: data, id: product?.id || '' }, {
                onSuccess: () => {
                    toast({
                        title: "Produto atualizado com sucesso",
                        description: (
                            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                                <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                            </pre>
                        ),
                    });
                }
            });
        }
    }

    const router = useRouter();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações do Produto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid space-y-6">
                                    <Card>
                                        <CardContent className="flex flex-col space-y-6">
                                            <FormField
                                                control={form.control}
                                                name="title"
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
                                            <ProductGroupField
                                                control={form.control}
                                                watch={form.watch}
                                                setValue={form.setValue}
                                            />
                                            <CategoryField
                                                control={form.control}
                                                watch={form.watch}
                                                setValue={form.setValue}
                                            />
                                            <TagField
                                                control={form.control}
                                                watch={form.watch}
                                                setValue={form.setValue}
                                            />
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Variações</CardTitle>
                                            <CardDescription>Adicione as variações desse produto</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <FormField
                                                control={form.control}
                                                name="variations"
                                                render={() => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <>
                                                                {fields.map((item, index) => (
                                                                    <div key={item.id} className="relative mb-4 border rounded-md mx-4 px-4 py-2 flex justify-between gap-4 border-stone-300 pb-4">
                                                                        <Button className="size-5 p-0 absolute top-2 right-2" variant="outline" onClick={() => remove(index)}>
                                                                            <X />
                                                                        </Button>
                                                                        <div className="h-full w-1/2 flex flex-col flex-1 gap-6 justify-between">
                                                                            <h4 className="text-lg font-medium">Variação {index + 1}</h4>
                                                                            <div>
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variations.${index}.title`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Título da Variação</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input placeholder="Título" {...field} />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name={`variations.${index}.price`}
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
                                                                                    name={`variations.${index}.description`}
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Descrição</FormLabel>
                                                                                            <FormControl>
                                                                                                <Input placeholder="Descrição da variação" {...field} />
                                                                                            </FormControl>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                                <FormField
                                                                                    control={form.control}
                                                                                    name="status"
                                                                                    render={({ field }) => (
                                                                                        <FormItem>
                                                                                            <FormLabel>Status</FormLabel>
                                                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                                                <FormControl>
                                                                                                    <SelectTrigger id="status" aria-label="Select status">
                                                                                                        <SelectValue placeholder="Select status" />
                                                                                                    </SelectTrigger>
                                                                                                </FormControl>
                                                                                                <SelectContent>
                                                                                                    <SelectItem value="active">Ativo</SelectItem>
                                                                                                    <SelectItem value="draft">Rascunho</SelectItem>
                                                                                                    <SelectItem value="archived">Arquivado</SelectItem>
                                                                                                </SelectContent>
                                                                                            </Select>
                                                                                            <FormMessage />
                                                                                        </FormItem>
                                                                                    )}
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                        {/* Image Input Component */}
                                                                        <div className="h-full w-1/2">
                                                                            <FormField
                                                                                control={form.control}
                                                                                name={`variations.${index}.media`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>Imagens</FormLabel>
                                                                                        <FormControl>
                                                                                            <ImageInput
                                                                                                value={Array.isArray(field.value) ? field.value : []}
                                                                                                onChange={field.onChange}
                                                                                            />
                                                                                        </FormControl>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </CardContent>
                                        <CardFooter className="justify-center border-t p-4">
                                            <Button type="button" size="sm" variant="ghost" className="gap-1" onClick={() => append({ title: '', price: 0, description: '', media: [] })}>
                                                <PlusCircle className="h-3.5 w-3.5" />
                                                Adicionar Variação
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                        <Card x-chunk="dashboard-07-chunk-3">
                            <CardHeader>
                                <CardTitle>Status do produto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger id="status" aria-label="Select status">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Ativo</SelectItem>
                                                    <SelectItem value="draft">Rascunho</SelectItem>
                                                    <SelectItem value="archived">Arquivado</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                            <CardHeader>
                                <CardTitle>Imagens do produto</CardTitle>
                                <CardDescription>
                                    Adicione as imagens do produto
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="media"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Imagens</FormLabel>
                                            <FormControl>
                                                <ImageInput value={field.value ? field.value : []} onChange={field.onChange} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button type="button" variant="destructive" size="sm" onClick={() => router.back()}>
                            Descartar
                        </Button>
                        <Button type="submit" size="sm">Salvar Produto</Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}