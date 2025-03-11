<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRepairTicketSettingRequest;
use App\Models\Branch;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class RepairTicketSettingController extends Controller
{
    public function index(): Response
    {
        $setting = Setting::where('key', 'info')->first();

        $branches = Branch::query()->orderBy('name', 'asc')->get();

        return Inertia::render('RepairTicketSetting/Index', [
            'setting' => json_decode($setting->value),
            'branches' => $branches
        ]);
    }

    public function update(UpdateRepairTicketSettingRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $setting = Setting::where('key', 'info')->first();
        $setting->update(['value' => json_encode($data['setting'])]);

        foreach ($data['branchesData'] as $branch) {
            Branch::where('id', $branch['id'])->update([
                'phone_number' => $branch['phone_number'],
                'address' => $branch['address']
            ]);
        }

        return Redirect::back()->with('success', 'Cập nhật thành công!');
    }

}
