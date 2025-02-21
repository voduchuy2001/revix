<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Models\Branch;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function detail(string|int $id): Response
    {
        $branch = Branch::with(['products' => function ($query) {
            $query->where('type', ProductType::IMPORT->value);
        }, 'products.stockMovement'])->findOrFail($id);

        return Inertia::render('Branch/Detail', [
            'products' => $branch->products,
            'branchId' => $branch->id,
        ]);
    }
}
