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
        $products = DB::table("products")->select("name","description","price","main_image")->get();

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
}