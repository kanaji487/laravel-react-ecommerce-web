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

const ProductEditPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit" />
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <form
                className="space-y-4"
            >
                <div>
                    <Label htmlFor='main_image'>Main image</Label>
                    <Input 
                        type='file'
                        id='main_image'
                    />
                </div>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input 
                        type='text'
                        id='name'
                    />
                </div>
                <div>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea 
                        id='description'
                    />
                </div>
                <div>
                    <Label htmlFor='price'>Price</Label>
                    <Input 
                        type='text'
                        id='price'
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Language</Label>
                    <Select>
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
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="publish">Publish</SelectItem>
                            <SelectItem value="unpublish">Unpublish</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </form>
        </div>
    </AppLayout>
  )
}

export default ProductEditPage;