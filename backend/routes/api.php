<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductsController;
use App\Http\Controllers\Api\ProductCategoryController;

Route::get('/user/list', [UserController::class, 'list']);

Route::get('/products/list', [ProductsController::class, 'list']);

Route::get('/product_category/list', [ProductCategoryController::class, 'list']);