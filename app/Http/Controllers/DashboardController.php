<?php

namespace App\Http\Controllers;

use App\Http\Requests\GetRevenueReportRequest;
use App\Http\Requests\StoreRevenueReportRequest;
use App\Models\Revenue;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function createRevenueReport(): Response
    {
        return Inertia::render('Dashboard/Partials/CreateRevenueReport');
    }

    public function storeRevenueReport(StoreRevenueReportRequest $request): RedirectResponse
    {
        $data = $request->validated();
        Revenue::create($data);

        return Redirect::back();
    }

    public function destroyRevenueReport(string|int $id): RedirectResponse
    {
        $revenue = Revenue::findOrFail($id);
        $revenue->delete();

        return Redirect::back();
    }

    private function getMonthlyRevenue(string|int $branchId)
    {
        $currentYear = Carbon::now()->year;

        return Revenue::where('branch_id', $branchId)
                ->whereYear('date', $currentYear)
                ->selectRaw('YEAR(date) as year, MONTH(date) as month, SUM(amount) as amount')
                ->groupBy('year', 'month')
                ->orderByRaw('month ASC')
                ->get();
    }

    public function index(GetRevenueReportRequest $request): Response
    {
        $reports = Revenue::query()
            ->when($request->filled('branches'), function ($query) use ($request) {
                $branches = $request->input('branches');
                if (is_array($branches)) {
                    $query->whereIn('branch_id', $branches);
                } else {
                    $query->where('branch_id', $branches);
                }
            })
            ->when($request->filled(['from', 'to']), function ($query) use ($request) {
                $query->whereBetween('date', [$request->input('from'), $request->input('to')]);
            })
            ->when($request->filled('from') && !$request->filled('to'), function ($query) use ($request) {
                $query->where('date', '>=', $request->input('from'));
            })
            ->when($request->filled('to') && !$request->filled('from'), function ($query) use ($request) {
                $query->where('date', '<=', $request->input('to'));
            })
            ->orderByDesc('created_at')
            ->get();

        $branchOne = $this->getMonthlyRevenue(1);
        $branchTwo = $this->getMonthlyRevenue(2);

        return Inertia::render('Dashboard/Index', [
            'reports' => $reports,
            'filters' => $request->only(['from', 'to']),
            'branchOne' => $branchOne,
            'branchTwo' => $branchTwo,
        ]);
    }
}
