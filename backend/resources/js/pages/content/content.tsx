import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { PackageSearch } from 'lucide-react';
import { 
    Card,
    CardHeader,
    CardContent
} from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content',
    },
];

const ContentListPage = () => {

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Content" />
        <div className='flex flex-row justify-between items-center p-4'>
            <Card 
                className='w-[150px] cursor-pointer' 
                onClick={() => router.visit("/content/products")}
            >
                <CardHeader>
                    <PackageSearch className="w-full h-full" />
                </CardHeader>
                <CardContent className="text-center">
                    <h1>Products</h1>
                </CardContent>
            </Card>
            <Card 
                className='w-[150px] cursor-pointer' 
                onClick={() => router.visit("/content/product_category")}
            >
                <CardHeader>
                    <PackageSearch className="w-full h-full" />
                </CardHeader>
                <CardContent className="text-center">
                    <h1>Product Category</h1>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  )
}

export default ContentListPage;