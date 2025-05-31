import { 
  usePage,
  router
} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Content',
        href: '/content'
    },
    {
      title: 'Products',
      href: '/'
    }
];

const ProductCategoryListPage = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Product category" />
        <div className="flex flex-row items-center justify-between p-4">
            <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            />
            <Button onClick={() => router.visit('/content/product_category/form')}>Create</Button>
        </div>
        <div className='relative w-full overflow-x-auto p-4'>
            <table className='min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 border-white'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>Name</th>
                        <th scope='col' className='px-6 py-3'>Description</th>
                        <th scope='col' className='px-6 py-3'>Created at</th>
                        <th scope='col' className='px-6 py-3'>Created by</th>
                        <th scope='col' className='px-6 py-3'>Updated At</th>
                        <th scope='col' className='px-6 py-3'>Updated by</th>
                        <th scope='col' className='px-6 py-3'>Language</th>
                        <th scope='col' className='px-6 py-3'>Status</th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test name
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test description
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test created at
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test created by
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test updated at
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test updated by
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test language
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test status
                        </th>
                        <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            Test action
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </AppLayout>
  )
}

export default ProductCategoryListPage;