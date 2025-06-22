import React from 'react';
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
        title: 'Edit',
        href: '/content/products/edit'
    }
];

const ProductEditPage = ({ product, category }: { product: any, category: Array<{ id: number; name: string }> }) => {
    const { data, setData, post, processing, errors } = useForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        main_image: product.main_image || '',
        obj_lang: product.obj_lang || '',
        obj_status: product.obj_status || '',
        category_id: product.category_id || '',
        category_name: category.find(cat => cat.id === product.category_id)?.name || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/content/products/${product.id}`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('main_image', file);
        }
    };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit" />
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
                method="POST"
            >
                <div>
                    <Label htmlFor='main_image'>Main image</Label>
                    {data.main_image && (
                        <div className="mb-2">
                            <img 
                                src={`/storage/${product.main_image}`}
                                alt="Current main image" 
                                className="w-32 h-32 object-cover rounded-md border"
                            />
                        </div>
                    )}
                    <Input 
                        type='file'
                        id='main_image'
                        onChange={handleFileChange}
                    />
                </div>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input 
                        type='text'
                        id='name'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea 
                        id='description'
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                        value={String(data.category_id)}
                        onValueChange={(value) => setData('category_id', value)}
                    >
                        <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                        {category.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    {errors.category_id && (
                        <p className="text-sm text-red-500 mt-1">{errors.category_id}</p>
                    )}
                    </div>
                <div>
                    <Label htmlFor='price'>Price</Label>
                    <Input 
                        type='text'
                        id='price'
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
                    {errors.obj_lang && (
                        <p className="text-sm text-red-500 mt-1">{errors.obj_lang}</p>
                    )}
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
                    {errors.obj_status && (
                        <p className="text-sm text-red-500 mt-1">{errors.obj_status}</p>
                    )}
                </div>
                <Button 
                    type='submit'
                    disabled={processing}
                >
                    {processing ? 'Updating...' : 'Update'}
                </Button>
            </form>
        </div>
    </AppLayout>
  )
}

export default ProductEditPage;