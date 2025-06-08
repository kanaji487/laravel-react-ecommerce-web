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
            'productCategory' => $product_category,
        ]);
    }

    public function form(Request $request): Response
    {
        return Inertia::render('content/product_category/form');
    }

    public function create(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'obj_lang' => 'nullable|string|max:10',
            'obj_status' => 'nullable|string|max:50'
        ]);

        $validated['created_by'] = Auth::id();

        try {
            ProductCategory::create($validated);
            return Redirect::to('/content/product_category')->with('success', 'Product category created successfully!');
        } catch (\Exception $e) {
            return Redirect::back()->withInput()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function edit($id)
    {
        $product_category = ProductCategory::findOrFail($id);

        return Inertia::render('content/product_category/edit', [
            'product_category' => $product_category
        ]);
    }

    public function update(Request $request, $id)
    {
        $product_category = ProductCategory::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'obj_lang' => 'required|string',
            'obj_status' => 'required|string',
        ]);

        $validated['updated_by'] = Auth::id();
        $product_category->update($validated);

        return Redirect::to('/content/product_category')->with('success', 'Product category updated successfully.');
    }

    public function destroy($id)
    {
        $product_category = ProductCategory::findOrFail($id);
        $product_category->delete();

        return back()->with('message', 'Product category deleted successfully.');
    }
}