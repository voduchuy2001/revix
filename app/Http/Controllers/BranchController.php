<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Models\Branch;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function detail(string|int $id): Response
    {
        if (!Auth::user()->isSuperUser() && Auth::user()->branch_id !== (int)$id) {
            abort(403);
        }

        $branch = Branch::with([
            'products' => function ($query) {
                $query->where('type', ProductType::IMPORT->value);
            },
            'products.stockMovement' => function ($query) {
                $query->orderBy('created_at', 'desc');
            },
            'products.stockMovement.createdBy'
        ])->findOrFail($id);


        return Inertia::render('Branch/Detail', [
            'products' => $branch->products,
            'branchId' => $branch->id,
        ]);
    }

    public function getReports(string|int $id): Response
    {
        $reports = Branch::with(['products' => function ($query) {
            $query
                ->where('type', ProductType::IMPORT->value)
                ->orderByDesc('created_at');
        }])
            ->findOrFail($id);

        return Inertia::render('Product/Partials/MovementReport', [
            'reports' => $reports,
        ]);
    }
}
