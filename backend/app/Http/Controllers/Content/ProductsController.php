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
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function list(Request $request): Response
    {
        $products = DB::table("products")
        ->select(
            "products.id", 
            "products.main_image", 
            "products.name", 
            "products.description", 
            "products.price", 
            "created_users.name as created_by",
            "updated_users.name as updated_by", 
            "products.created_at", 
            "products.updated_at", 
            "products.obj_lang", 
            "products.obj_status"
        )
        ->leftJoin('users as created_users', 'products.created_by', '=', 'created_users.id')
        ->leftJoin('users as updated_users', 'products.updated_by', '=', 'updated_users.id')
        ->orderBy('products.created_at', 'desc')
        ->paginate(15);

        return Inertia::render('content/products/list', [
            'products' => $products,
        ]);
    }

    public function form(Request $request): Response
    {
        $category = DB::table("product_category")->select("id", "name")->get();

        return Inertia::render('content/products/form', ['category' => $category]);
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:product_category,id',
            'price' => 'nullable|numeric',
            'obj_lang' => 'nullable|string|max:10',
            'obj_status' => 'nullable|string|max:50'
        ]);

        if ($request->hasFile('main_image')) {
            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = $path;
        }

        $validated['created_by'] = Auth::id();

        try {
            Product::create($validated);
            return Redirect::to('/content/products')->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            return Redirect::back()->withInput()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $product = Product::findOrFail($id);

        return Inertia::render('content/products/edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        if ($request->hasFile('main_image')) {
            $validated = $request->validate([
                'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|string',
                'obj_lang' => 'required|string',
                'obj_status' => 'required|string',
            ]);
        } else {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'price' => 'nullable|string',
                'obj_lang' => 'required|string',
                'obj_status' => 'required|string',
            ]);
        }

        if ($request->hasFile('main_image')) {

            if ($product->main_image && Storage::disk('public')->exists($product->main_image)) {
                Storage::disk('public')->delete($product->main_image);
            }

            $path = $request->file('main_image')->store('products', 'public');
            $validated['main_image'] = $path;
        }

        $validated['updated_by'] = Auth::id();
        $product->update($validated);

        return Redirect::to('/content/products')->with('success', 'Product updated successfully.');
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return back()->with('message', 'Product deleted successfully.');
    }
}