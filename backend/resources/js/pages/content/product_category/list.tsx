import { useMemo, useState } from 'react';
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
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
    EllipsisVertical,
    Pencil,
    Trash2,
    Eye
} from 'lucide-react';
import ThaiFlag from "../../../../../public/thailand.png";
import EngFlag from "../../../../../public/english.png";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';

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
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [filterLanguage, setFilterLanguage] = useState('');

    const { productCategory } = usePage().props as unknown as {
        productCategory: PaginatedProductCategory;
    };

    const handlePageChange = (url: string | null) => {
        if (url) {
        router.visit(url);
        }
    };

    const handleDelete = (product_category: ProductCategory) => {
        router.delete(`/content/product_category/${product_category.id}`, {
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

    const columns = useMemo<ColumnDef<ProductCategory>[]>(() => [
        {
            accessorKey: 'name',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Name
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'description',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Description
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Created at
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'created_by',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Created by
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'updated_at',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Updated at
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'updated_by',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Updated by
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: info => info.getValue()
        },
        {
            accessorKey: 'obj_lang',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Language
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: ({ getValue }) => {
                const lang = getValue() as string;
                return lang === 'tha' ? (
                    <Badge className="flex items-center gap-2 bg-blue-100 text-blue-800">
                        <img src={ThaiFlag} alt="thai" width={30} height={20} />
                    </Badge>
                ) : lang === 'eng' ? (
                    <Badge className="flex items-center gap-2 bg-red-100 text-red-800">
                        <img src={EngFlag} alt="eng" width={30} height={20} />
                    </Badge>
                ) : (
                    <Badge variant="secondary">Unknown</Badge>
                );
            }
        },
        {
            accessorKey: 'obj_status',
            header: ({ column }) => (
                <div
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="cursor-pointer flex items-center gap-2"
                >
                    Status
                    {column.getIsSorted() === 'asc' ? '⬆️' : column.getIsSorted() === 'desc' ? '⬇️' : ''}
                </div>
            ),
            enableSorting: true,
            enableGlobalFilter: true,
            cell: ({ getValue }) => {
                return getValue() === 'publish' ? (
                    <Badge className="bg-green-500 text-white">Publish</Badge>
                ) : (
                    <Badge className="bg-gray-500 text-white">Unpublish</Badge>
                );
            }
        },
        {
            id: 'actions',
            header: 'Action',
            cell: ({ row }) => {
                const item = row.original;
                return (
                <Popover>
                    <PopoverTrigger>
                        <EllipsisVertical className="cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className='w-[10rem]'>
                        <button
                            onClick={() => router.visit(`/content/product_category/${item.id}/edit`)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                        >
                            <Pencil className="w-4 h-4" />
                            <span>Edit</span>
                        </button>
                        <button
                            onClick={() => handleDelete(item)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                        </button>
                        <button
                            onClick={() => handleQuickView(item)}
                            className="flex items-center gap-2 w-full hover:bg-zinc-800 px-2 py-1 rounded-md"
                        >
                            <Eye className="w-4 h-4" />
                            <span>Quick view</span>
                        </button>
                    </PopoverContent>
                </Popover>
                );
            },
        },
    ], []);

    const table = useReactTable({
        data: productCategory.data,
        columns,
        state: {
            sorting,
            globalFilter,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

    const handleFilter = () => {
        setIsFilterOpen(true);
    };

    const applyFilter = () => {
        setIsFilterOpen(false);
        router.visit('/content/product_category', {
            data: {
                name: filterName,
                obj_lang: filterLanguage
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Product category" />
        <div className="flex flex-row items-center justify-between p-4">
            <input
                type="text"
                placeholder="Search..."
                value={globalFilter}
                onChange={e => setGlobalFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 w-full max-w-xs"
            />
            <div className='flex flex-row gap-2'>
                <Button onClick={() => handleFilter()}>Filter</Button>
                <Button onClick={() => router.visit('/content/product_category/form')}>Create</Button>
            </div>
        </div>
        <div className='relative w-full overflow-x-auto p-4'>
            <div className='min-w-[1000px] w-full'>
                <div className='flex bg-gray-50 dark:bg-gray-700 text-xs font-semibold'>
                {table.getHeaderGroups().map(headerGroup => (
                    <div key={headerGroup.id} className="flex w-full">
                    {headerGroup.headers.map(header => (
                        <div key={header.id} className='px-6 py-3 w-full'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                    ))}
                    </div>
                ))}
                </div>

                <div className='divide-y'>
                {table.getRowModel().rows.map(row => (
                    <div key={row.id} className='flex bg-white dark:bg-gray-800 text-sm text-gray-900 dark:text-white'>
                    {row.getVisibleCells().map(cell => (
                        <div key={cell.id} className='px-6 py-4 w-full'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))}
                    </div>
                ))}
                </div>
            </div>
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
        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>
                    Filter product category data
                </SheetDescription>
            </SheetHeader>
            <div className="mt-4 mx-4 space-y-4">
                <div className='flex flex-col space-y-2'>
                    <Label>Name</Label>
                    <Input 
                        type='text'
                        id='name'
                        value={filterName}
                        onChange={e => setFilterName(e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Label>Language</Label>
                    <Select
                        value={filterLanguage}
                        onValueChange={value => setFilterLanguage(value)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tha">THA</SelectItem>
                            <SelectItem value="eng">ENG</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={() => applyFilter()}>Apply</Button>
            </div>
            </SheetContent>
        </Sheet>
    </AppLayout>
  )
}

export default ProductCategoryListPage;