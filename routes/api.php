<?php

use App\Http\Controllers\LicenseController;
use Illuminate\Support\Facades\Route;

Route::post('/license', [LicenseController::class, 'license'])->name('license');
