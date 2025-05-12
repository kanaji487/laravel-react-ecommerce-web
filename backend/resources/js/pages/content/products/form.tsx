import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { 
    Head, 
    useForm 
} from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content'
    },
    {
      title: 'Products',
      href: '/content/products'
    },
    {
        title: 'Form',
        href: '/content/products/form'
    }
];

const ProductsFormPage = () => {
    const { data, setData, post, processing, errors } = useForm<{
        main_image: File | null;
        name: string;
        description: string;
        price: string;
        obj_lang: string;
        obj_status: string;
    }>({
        main_image: null,
        name: '',
        description: '',
        price: '',
        obj_lang: '',
        obj_status: ''
    });

    // const { data, setData, post, processing, errors } = useForm({
    //     main_image: File | null,
    //     name: '',
    //     description: '',
    //     price: '',
    //     obj_lang: '',
    //     obj_status: ''
    // });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/content/products/form')
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Form" />
        
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
                <h1 className="text-2xl font-bold">Create New Product</h1>
                <form 
                    onSubmit={handleSubmit} 
                    className="space-y-4"
                >
                    <div>
                        <Label htmlFor='main_image'>Main image</Label>
                        <Input 
                            id='main_image'
                            type='file' 
                            onChange={(e) => setData('main_image', e.target.files?.[0] || null)}
                        />
                        {errors.main_image && (
                            <p className="text-sm text-red-500 mt-1">{errors.main_image}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1"
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            required
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="price">Price</Label>
                        <Input 
                            type='text'
                            id="price"
                            className="mt-1"
                            value={data.price}
                            onChange={(e) => setData('price', e.target.value)}
                        />
                        {errors.price && (
                            <p className="text-sm text-red-500 mt-1">{errors.price}</p>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label>Language</Label>
                        <Select
                            value={data.obj_lang}
                            onValueChange={(value) => setData('obj_lang', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tha">THA</SelectItem>
                                <SelectItem value="eng">ENG</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label>Status</Label>
                        <Select
                            value={data.obj_status}
                            onValueChange={(value) => setData('obj_status', value)}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="publish">Publish</SelectItem>
                                <SelectItem value="unpublish">Unpublish</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button 
                        type="submit" 
                        disabled={processing}
                    >
                        {processing ? 'Saving...' : 'Save'}
                    </Button>
                </form>
            </div>
    </AppLayout>
  )
}

export default ProductsFormPage;