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
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Form" />
        <div className="max-w-2xl mx-4 space-y-6 mt-8">
            <h1 className="text-2xl font-bold">Create new product category</h1>
            <form
                className="space-y-4"
            >
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='name'>Name</Label>
                    <Input 
                        id='name'
                        type='text'
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='description'>Description</Label>
                    <Textarea
                        id="description"
                        className="mt-1"
                        required
                    />
                </div>
                <Button 
                    type="submit" 
                >
                    Save
                </Button>
            </form>
        </div>
    </AppLayout>
  )
}

export default ProductCategoryCreatePage