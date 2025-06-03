import { useState } from 'react';
import { 
  usePage,
  router
} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
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

type ProductCategory = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  obj_lang: string;
  obj_status: string;
};

type PaginatedProductCategory = {
  data: ProductCategory[];
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
};

const ProductCategoryListPage = () => {
    const [selectedProductCategory, setSelectedProductCategory] = useState<ProductCategory | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const { productCategory } = usePage().props as unknown as {
        productCategory: PaginatedProductCategory;
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
        router.visit(url);
        }
    };

    const handleDelete = (product_category: ProductCategory) => {
        router.delete(`/content/products/${product_category.id}`, {
          preserveScroll: true,
        });
    };

    const handleQuickView = (product_category: ProductCategory) => {
        setSelectedProductCategory(product_category);
        setIsSheetOpen(true);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 1; i <= productCategory.last_page; i++) {
        pages.push(
            <PaginationItem key={i}>
                <PaginationLink
                    isActive={i === productCategory.current_page}
                    onClick={() => handlePageChange(`/product_category?page=${i}`)}
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
                    {productCategory.data.length > 0 ? (
                        productCategory.data.map(category => (
                            <tr 
                                key={category.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'
                            >
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.name}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.description}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.created_at}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.created_by}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.updated_at}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.updated_by}
                                </th>
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {category.obj_lang === "tha" ? (
                                        <Badge className="flex items-center gap-2 bg-blue-100 text-blue-800">
                                            <img src={ThaiFlag} alt="thai" width={30} height={20} />
                                        </Badge>
                                    ) : category.obj_lang === "eng" ? (
                                        <Badge className="flex items-center gap-2 bg-red-100 text-red-800">
                                            <img src={EngFlag} alt="thai" width={30} height={20} />
                                        </Badge>
                                    ) : (
                                        <Badge variant="secondary">Unknown</Badge>
                                    )}
                                </th>
                                <th className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                    {category.obj_status === "publish" ? (
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
                                                onClick={() => router.visit(`/content/product_category/${category.id}/edit`)}
                                                className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                <span>Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(category)}
                                                className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Delete</span>
                                            </button>
                                            <button
                                                onClick={() => handleQuickView(category)}
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
                    ): (
                        <tr>
                            <td colSpan={4} className="text-center py-4">No product category found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="mt-6">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                        <PaginationPrevious
                            onClick={() => handlePageChange(productCategory.prev_page_url)}
                            className={productCategory.prev_page_url ? '' : 'pointer-events-none opacity-50'}
                        />
                        </PaginationItem>

                        {renderPageNumbers()}

                        <PaginationItem>
                        <PaginationNext
                            onClick={() => handlePageChange(productCategory.next_page_url)}
                            className={productCategory.next_page_url ? '' : 'pointer-events-none opacity-50'}
                        />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>{selectedProductCategory?.name}</SheetTitle>
                <SheetDescription>
                Quick view of product details
                </SheetDescription>
            </SheetHeader>
            <div className="mt-4 mx-4 space-y-4">
                <p><strong>Description:</strong> {selectedProductCategory?.description}</p>
                <p><strong>Status:</strong> {selectedProductCategory?.obj_status}</p>
                <p><strong>Language:</strong> {selectedProductCategory?.obj_lang}</p>
                <p><strong>Created by:</strong> {selectedProductCategory?.created_by}</p>
                <p><strong>Created at:</strong> {selectedProductCategory?.created_at}</p>
            </div>
            </SheetContent>
        </Sheet>
    </AppLayout>
  )
}

export default ProductCategoryListPage;