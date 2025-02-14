<?php

namespace App\Http\Controllers;

use App\Models\RepairTicket;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->query('search');

        // Lấy giá trị ngày từ request, nếu không có thì dùng mặc định từ đầu ngày đến cuối ngày
        $fromDate = $request->input('from_date')
            ? Carbon::parse($request->input('from_date'))->startOfDay()
            : Carbon::now()->startOfDay();

        $toDate = $request->input('to_date')
            ? Carbon::parse($request->input('to_date'))->endOfDay()
            : Carbon::now()->endOfDay();

        // Truy vấn phiếu sửa chữa theo khoảng ngày và tìm kiếm theo tên/số điện thoại khách hàng
        $tickets = RepairTicket::with(['customer', 'device', 'technician'])
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->when($search, function ($query) use ($search) {
                $query->whereHas('customer', function ($q) use ($search) {
                    $q->where('name', 'like', "%$search%")
                      ->orWhere('phone_number', 'like', "%$search%");
                });
            })
            ->get();

        return Inertia::render('RepairTicket/Index', [
            'tickets' => $tickets,
        ]);
    }

}
