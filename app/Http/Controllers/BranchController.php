<?php

namespace App\Http\Controllers;

use App\Enums\ProductType;
use App\Models\Branch;
use App\Models\Setting;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class BranchController extends Controller
{
    public function detail(string|int $id): Response
    {
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
        $now = Carbon::now();
        $startOfDay = $now->copy()->startOfDay();
        $endOfDay = $now->copy()->endOfDay();

        $reports = Branch::with(['products.stockMovement' => function ($query) use ($startOfDay, $endOfDay) {
            $query
                ->where('type', ProductType::IMPORT->value)
                ->whereBetween('created_at', [$startOfDay, $endOfDay])
                ->orderByDesc('created_at');
        }])
            ->findOrFail($id);

        $setting = Setting::where('key', 'info')->first();

        return Inertia::render('Product/Partials/MovementReport', [
            'reports' => $reports,
            'setting' => json_decode($setting->value)
        ]);
    }
}
