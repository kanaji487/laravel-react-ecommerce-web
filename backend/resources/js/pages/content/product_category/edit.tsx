import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { 
    Head, 
    useForm
} from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content'
    },
    {
      title: 'Product category',
      href: '/content/product_category'
    },
    {
        title: 'Edit',
        href: '/content/product_category/edit'
    }
];

const ProductCategoryEditPage = ({ product_category }: { product_category: any }) => {

    const { data, setData, post, processing, errors } = useForm({
        name: product_category.name || '',
        description: product_category.description || '',
        obj_lang: product_category.obj_lang || '',
        obj_status: product_category.obj_status || ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/content/product_category/${product_category.id}`);
    };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Edit" />
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
            <h1 className="text-2xl font-bold">Edit product category</h1>
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
                method="POST"
            >
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input 
                        id='name'
                        type='text'
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>
                <div className='flex flex-col space-y-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                        id="description"
                        className="mt-1"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                    />
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
                    {processing ? 'Updating' : 'Update'}
                </Button>
            </form>
        </div>
    </AppLayout>
  )
}

export default ProductCategoryEditPage;