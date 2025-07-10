import { useState } from 'react';
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
    EllipsisVertical,
    Pencil,
    Trash2,
    Eye
} from 'lucide-react';
import ThaiFlag from "../../../../../public/thailand.png";
import EngFlag from "../../../../../public/english.png";

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
  main_image: string;
  name: string;
  description: string;
  price: number;
  category_name: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  obj_lang: string;
  obj_status: string;
};

type PaginatedProducts = {
  data: Product[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

const ProductsListPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { products } = usePage().props as unknown as {
    products: PaginatedProducts;
  };

  const handlePageChange = (url: string | null) => {
    if (url) {
      router.visit(url);
    }
  };

  const handleDelete = (products: Product) => {
    router.delete(`/content/products/${products.id}`, {
      preserveScroll: true,
    });
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
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
        <Button onClick={() => router.visit('/content/products/form')}>Create</Button>
      </div>
      <div>
        <div className='relative w-full overflow-x-auto p-4'>
          <table className='min-w-[1000px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-2 border-white'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope='col' className='px-6 py-3'>Image</th>
                <th scope='col' className='px-6 py-3'>Name</th>
                <th scope='col' className='px-6 py-3'>Description</th>
                <th scope='col' className='px-6 py-3'>Price</th>
                <th scope='col' className='px-6 py-3'>Category</th>
                <th scope='col' className='px-6 py-3'>Created at</th>
                <th scope='col' className='px-6 py-3'>Created by</th>
                <th scope='col' className='px-6 py-3'>Updated at</th>
                <th scope='col' className='px-6 py-3'>Updated by</th>
                <th scope='col' className='px-6 py-3'>Language</th>
                <th scope='col' className='px-6 py-3'>Status</th>
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
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.main_image && (
                        <img
                          src={`/storage/${product.main_image}`}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.name}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.description}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.price}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.category_name}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.created_at}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.created_by}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.updated_at}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.updated_by}
                    </th>
                    <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.obj_lang === "tha" ? (
                        <Badge className="flex items-center gap-2 bg-blue-100 text-blue-800">
                          <img src={ThaiFlag} alt="thai" width={30} height={20} />
                        </Badge>
                      ) : product.obj_lang === "eng" ? (
                        <Badge className="flex items-center gap-2 bg-red-100 text-red-800">
                          <img src={EngFlag} alt="thai" width={30} height={20} />
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Unknown</Badge>
                      )}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      {product.obj_status === "publish" ? (
                        <Badge className="bg-green-500 text-white hover:bg-green-600">Publish</Badge>
                      ) : (
                        <Badge className="bg-gray-500 text-white hover:bg-gray-600">Unpublish</Badge>
                      )}
                    </th>
                    <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                      <Popover>
                        <PopoverTrigger>
                          <EllipsisVertical className="cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className='w-[10rem]'>
                          <button
                            onClick={() => router.visit(`/content/products/${product.id}/edit`)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                          >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(product)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                          <button
                            onClick={() => handleQuickView(product)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Quick view</span>
                          </button>
                        </PopoverContent>
                      </Popover>
                    </th>
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
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle>{selectedProduct?.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 mx-4 space-y-4">
            {selectedProduct?.main_image && (
              <img
                src={`/storage/${selectedProduct.main_image}`}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded"
              />
            )}
            <p><strong>Description:</strong> {selectedProduct?.description}</p>
            <p><strong>Category:</strong> {selectedProduct?.category_name}</p>
            <p><strong>Price:</strong> ${selectedProduct?.price}</p>
            <p><strong>Status:</strong> {selectedProduct?.obj_status}</p>
            <p><strong>Language:</strong> {selectedProduct?.obj_lang}</p>
            <p><strong>Created by:</strong> {selectedProduct?.created_by}</p>
            <p><strong>Created at:</strong> {selectedProduct?.created_at}</p>
          </div>
        </SheetContent>
      </Sheet>
    </AppLayout>
  )
}

export default ProductsListPage;