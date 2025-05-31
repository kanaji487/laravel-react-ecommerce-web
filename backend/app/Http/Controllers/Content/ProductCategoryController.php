<?php

namespace App\Http\Controllers\Content;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use App\Models\ProductCategory;

class ProductCategoryController extends Controller
{
    public function list(Request $request): Response
    {
        $product_category = DB::table("product_category")->select("id","name","description","created_by","updated_by", "created_at", "updated_at", "obj_lang", "obj_status")->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('content/product_category/list', [
            'product_category' => $product_category,
        ]);
    }
}