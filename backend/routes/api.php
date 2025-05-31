<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProductsController;

Route::get('/user/list', [UserController::class, 'list']);

Route::get('/products/list', [ProductsController::class, 'list']);