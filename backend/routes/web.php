<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Content\ContentController;
use App\Http\Controllers\Content\ProductsController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('content', [ContentController::class, 'list'])->name('content.list');

    Route::get('content/products', [ProductsController::class, 'list'])->name('products.list');
    Route::get('content/products/form', [ProductsController::class, 'form'])->name('products.form');
    Route::post('content/products/form', [ProductsController::class, 'create'])->name('products.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
