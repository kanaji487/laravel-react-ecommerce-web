import { 
  usePage,
  router
} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
};

type PaginatedProducts = {
  data: Product[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

const ProductsListPage = () => {

  const { products } = usePage().props as unknown as {
    products: PaginatedProducts;
  };

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= products.last_page; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === products.current_page}
            onClick={() => handlePageChange(`/products?page=${i}`)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Products" />
      <div className="flex flex-row items-center justify-between p-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
        />
        <Button>Create</Button>
      </div>
      <div>
        <div className='relative w-full overflow-x-auto p-4'>
          <table className='min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 border-white'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>Name</th>
                <th scope='col' className='px-6 py-3'>Description</th>
                <th scope='col' className='px-6 py-3'>Price</th>
                <th scope='col' className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.data.length > 0 ? (
                products.data.map(product => (
                  <tr 
                    key={product.id} 
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
                  >
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{product.name}</th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{product.description}</th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{product.price}</th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>{product.price}</th>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
          
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(products.prev_page_url)}
                    className={products.prev_page_url ? '' : 'pointer-events-none opacity-50'}
                  />
                </PaginationItem>

                {renderPageNumbers()}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(products.next_page_url)}
                    className={products.next_page_url ? '' : 'pointer-events-none opacity-50'}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default ProductsListPage;