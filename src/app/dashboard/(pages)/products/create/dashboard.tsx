import { PlusCircle }from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProductForm } from "./form"
import { ImageInput } from "./form/images/input"

export const CreatePageDashboard = () => {
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                    <div className="hidden items-center gap-2 md:ml-auto md:flex">
                        <Button variant="destructive" size="sm">
                            Descartar
                        </Button>
                        <Button size="sm">Salvar Produto</Button>
                    </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <ProductForm />
                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Variações</CardTitle>
                                <CardDescription>
                                    Adicione as variações desse produto
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">SKU</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="w-[100px]">Size</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-001
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-1" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-1"
                                                    type="number"
                                                    defaultValue="100"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-1" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-1"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-002
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-2" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-2"
                                                    type="number"
                                                    defaultValue="143"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-2" className="sr-only">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price-2"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="m"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-semibold">
                                                GGPC-003
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="stock-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="stock-3"
                                                    type="number"
                                                    defaultValue="32"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Label htmlFor="price-3" className="sr-only">
                                                    Stock
                                                </Label>
                                                <Input
                                                    id="price-3"
                                                    type="number"
                                                    defaultValue="99.99"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <ToggleGroup
                                                    type="single"
                                                    defaultValue="s"
                                                    variant="outline"
                                                >
                                                    <ToggleGroupItem value="s">S</ToggleGroupItem>
                                                    <ToggleGroupItem value="m">M</ToggleGroupItem>
                                                    <ToggleGroupItem value="l">L</ToggleGroupItem>
                                                </ToggleGroup>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table> */}
                            </CardContent>
                            <CardFooter className="justify-center border-t p-4">
                                <Button size="sm" variant="ghost" className="gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    Add Variant
                                </Button>
                            </CardFooter>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-2">
                            <CardHeader>
                                <CardTitle>Product Category</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-6 sm:grid-cols-3">
                                    <div className="grid gap-3">
                                        <Label htmlFor="category">Category</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="category"
                                                aria-label="Select category"
                                            >
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="clothing">Clothing</SelectItem>
                                                <SelectItem value="electronics">
                                                    Electronics
                                                </SelectItem>
                                                <SelectItem value="accessories">
                                                    Accessories
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="subcategory">
                                            Subcategory (optional)
                                        </Label>
                                        <Select>
                                            <SelectTrigger
                                                id="subcategory"
                                                aria-label="Select subcategory"
                                            >
                                                <SelectValue placeholder="Select subcategory" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="t-shirts">T-Shirts</SelectItem>
                                                <SelectItem value="hoodies">Hoodies</SelectItem>
                                                <SelectItem value="sweatshirts">
                                                    Sweatshirts
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
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
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="status">Status</Label>
                                        <Select defaultValue="published">
                                            <SelectTrigger id="status" aria-label="Select status">
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="published">Ativo</SelectItem>
                                                <SelectItem value="draft">Rascunho</SelectItem>
                                                <SelectItem value="archived">Arquivado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
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
                                <ImageInput/>
                            </CardContent>
                        </Card>
                        <Card x-chunk="dashboard-07-chunk-5">
                            <CardHeader>
                                <CardTitle>Archive Product</CardTitle>
                                <CardDescription>
                                    Lipsum dolor sit amet, consectetur adipiscing elit.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div></div>
                                <Button size="sm" variant="secondary">
                                    Archive Product
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                    <Button variant="outline" size="sm">
                        Discard
                    </Button>
                    <Button size="sm">Save Product</Button>
                </div>
            </div>
        </main>
    )
}