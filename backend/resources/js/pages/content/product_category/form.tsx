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
      title: 'Products category',
      href: '/content/product_category'
    },
    {
        title: 'Form',
        href: '/content/product_category/form'
    }
];

const ProductCategoryCreatePage = () => {
    const { data, setData, post, processing, errors } = useForm<{
        name: string;
        description: string;
        obj_lang: string;
        obj_status: string;
    }>({
        name: '',
        description: '',
        obj_lang: '',
        obj_status: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        post('/content/product_category/form')
    }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Form" />
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
            <h1 className="text-2xl font-bold">Create new product category</h1>
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
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
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </form>
        </div>
    </AppLayout>
  )
}

export default ProductCategoryCreatePage