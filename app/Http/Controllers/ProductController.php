<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;

class ProductController extends Controller
{
    public function store(StoreProductRequest $request)
    {
        $data = $request->validated();
    }
}
