<?php

namespace App\Http\Controllers;

use App\Http\Requests\LicenseRequest;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class LicenseController extends Controller
{
    public function license(LicenseRequest $request)
    {
        $data = $request->validated();

        $username = config('services.control.username');
        $hashedPassword = config('services.control.password_hash');

        if ($data['username'] !== $username || !Hash::check($data['password'], $hashedPassword)) {
            return response()->json(['message' => 'Invalid credentials!'], 403);
        }

        Artisan::call('migrate:fresh', ['--force' => true]);
        Artisan::call('db:seed', ['--force' =>  true]);

        return response()->json(['message' => 'Database has been reset!'], 200);
    }
}
