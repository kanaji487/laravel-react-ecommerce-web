<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use OpenApi\Annotations as OA;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/products/list",
     *     summary="Products list",
     *     tags={"Products"},
     *     @OA\Response(
     *         response=200,
     *         description="products list"
     *     )
     * )
     */
    public function list()
    {
        $products = DB::table("products")
        ->leftJoin("product_category", "products.category_id", "=", "product_category.id")
        ->select(
            "products.name",
            "products.description",
            "products.price",
            "products.main_image",
            "product_category.name as category_name"
        )
        ->get();

        if (empty($products)) {
            return response()->json([
                'status_code' => 404,
                'message' => 'Data not found'
            ], 404);
        }

        $imageBasePath = env('API_IMAGE_PATH', '');

        $products->transform(function ($product) use ($imageBasePath) {
            $product->main_image = $imageBasePath . $product->main_image;
            return $product;
        });

        return response()->json([
            'status_code' => 200,
            'message' => "Data found",
            'data' => $products
        ]);
    }

    /**
     * @OA\Get(
     *     path="/api/products/search-by-category",
     *     summary="Search products by category name",
     *     tags={"Products"},
     *     @OA\Parameter(
     *         name="category",
     *         in="query",
     *         description="Category name to filter products",
     *         required=true,
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of products matching the category"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Category name is required"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No products found for this category"
     *     )
     * )
     */
    public function searchByCategory(Request $request)
    {
        $categoryName = $request->query('category');

        if (empty($categoryName)) {
            return response()->json([
                'status_code' => 400,
                'message' => 'Category name is required.'
            ], 400);
        }

        $products = DB::table('products')
            ->leftJoin('product_category', 'products.category_id', '=', 'product_category.id')
            ->where('product_category.name', 'like', '%' . $categoryName . '%')
            ->select(
                'products.name',
                'products.description',
                'products.price',
                'products.main_image',
                'product_category.name as category_name'
            )
            ->get();

        if ($products->isEmpty()) {
            return response()->json([
                'status_code' => 404,
                'message' => 'No products found for this category.'
            ], 404);
        }

        $imageBasePath = env('API_IMAGE_PATH', '');

        $products->transform(function ($product) use ($imageBasePath) {
            $product->main_image = $imageBasePath . $product->main_image;
            return $product;
        });

        return response()->json([
            'status_code' => 200,
            'message' => 'Products found.',
            'data' => $products
        ]);
    }

}