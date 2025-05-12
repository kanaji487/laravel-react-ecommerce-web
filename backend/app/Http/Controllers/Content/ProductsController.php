<?php

namespace App\Http\Controllers\Content;

use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    public function list(Request $request): Response
    {
        $products = DB::table("products")->select("id", "name", "description", "price")->paginate(15);;

        return Inertia::render('content/products/list', [
            'products' => $products,
        ]);
    }

    public function form(Request $request): Response
    {
        return Inertia::render('content/products/form');
    }
}