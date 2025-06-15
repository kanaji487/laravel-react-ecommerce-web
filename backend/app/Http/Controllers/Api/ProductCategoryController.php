<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use OpenApi\Annotations as OA;
use Illuminate\Support\Facades\DB;

class ProductCategoryController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/product_category/list",
     *     summary="Product category list",
     *     tags={"Product category"},
     *     @OA\Parameter(
     *         name="name",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string"),
     *         description="Filter product categories by name"
     *     ),
     *     @OA\Parameter(
     *         name="description",
     *         in="query",
     *         required=false,
     *         @OA\Schema(type="string"),
     *         description="Filter product categories by description"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="product category list"
     *     )
     * )
     */
    public function list()
    {
        $name = request()->query('name');
        $description = request()->query('description');

        $query = DB::table("product_category")->select("name", "description");

        if (!empty($name)) {
            $query->where('name', 'like', '%' . $name . '%');
        }

        if (!empty($description)) {
            $query->where('description', 'like', '%' . $description . '%');
        }

        $product_category = $query->get();

        if ($product_category->isEmpty()) {
            return response()->json([
                'status_code' => 404,
                'message' => 'Data not found'
            ], 404);
        }

        return response()->json([
            'status_code' => 200,
            'message' => "Data found",
            'data' => $product_category
        ]);
    }

}