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
        $products = DB::table("products")->select("id", "main_image" ,"name", "description", "price", "created_by", "updated_by", "created_at", "updated_at", "obj_lang", "obj_status")->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('content/products/list', [
            'products' => $products,
        ]);
    }

    public function form(Request $request): Response
    {
        return Inertia::render('content/products/form');
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
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

        $validated = $request->validate([
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|string',
            'obj_lang' => 'required|in:tha,eng', 
            'obj_status' => 'required|in:publish,unpublish',
        ]);

        if ($request->hasFile('main_image')) {

            if ($product->main_image && Storage::disk('public')->exists($products->main_image)) {
                Storage::disk('public')->delete($product->main_image);
            }

            $image = $request->file('main_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $imagePath = $image->storeAs('products', $imageName, 'public');
            $validated['main_image'] = $imagePath;
        }

        $validated['updated_by'] = Auth::id();
        $product->update($validated);

        return Redirect::to('/content/products')->with('success', 'Category updated successfully.');
    }
}