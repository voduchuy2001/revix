<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $revenues =  RepairTicket::selectRaw('MONTH(created_at) as month, SUM(amount) as amount')
            ->groupByRaw('MONTH(created_at)')
            ->orderBy('month', 'asc')
            ->get();

        return Inertia::render('Dashboard/Index', [
            'revenues' => $revenues
        ]);
    }
}
