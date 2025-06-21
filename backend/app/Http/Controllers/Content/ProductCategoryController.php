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
        $product_category = DB::table("product_category")
        ->select(
            "product_category.id",
            "product_category.name",
            "product_category.description",
            "created_users.name as created_by",
            "updated_users.name as updated_by",
            "product_category.created_at", 
            "product_category.updated_at", 
            "product_category.obj_lang", 
            "product_category.obj_status")
        ->leftJoin('users as created_users', 'product_category.created_by', '=', 'created_users.id')
        ->leftJoin('users as updated_users', 'product_category.updated_by', '=', 'updated_users.id');

        if ($request->filled('name')) {
            $product_category->where('product_category.name', 'like', '%' . $request->name . '%');
        }

        if ($request->filled('obj_lang')) {
            $product_category->where('product_category.obj_lang', $request->obj_lang);
        }

        $product_category = $product_category->orderBy('product_category.created_at', 'desc')->paginate(15)->withQueryString();

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