<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RepairTicketController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WelcomeController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
    ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');
    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
    Route::get('/', [WelcomeController::class, 'index'])->name('/');
});

Route::middleware('auth')->group(function () {
    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');
    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);
    Route::put('password', [PasswordController::class, 'update'])->name('password.update');
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});


Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::prefix('repair-ticket')->group(function () {
        Route::get('/{branchId}', [RepairTicketController::class, 'index'])->name('repair_ticket.index');
        Route::get('/create/{branchId}', [RepairTicketController::class, 'create'])->name('repair_ticket.create');
        Route::post('/store', [RepairTicketController::class, 'store'])->name('repair_ticket.store');
        Route::delete('/delete/{id}', [RepairTicketController::class, 'destroy'])->name('repair_ticket.destroy');
        Route::get('/print/{id}', [RepairTicketController::class, 'print'])->name('repair_ticket.print');
        Route::get('/edit/{id}', [RepairTicketController::class, 'edit'])->name('repair_ticket.edit');
        Route::put('/update/{id}', [RepairTicketController::class, 'update'])->name('repair_ticket.update');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::middleware(['is_super_user'])->group(function () {
        Route::prefix('user')->group(function () {
            Route::post('/store', [UserController::class, 'store'])->name('user.store');
            Route::put('/update/{id}', [UserController::class, 'update'])->name('user.update');
            Route::get('/', [UserController::class, 'getUsers'])->name('user.index');
            Route::delete('/delete/{id}', [UserController::class, 'destroy'])->name('user.destroy');
        });

    });

    Route::get('/customer', [UserController::class, 'getCustomers'])->name('customer.index');

    Route::prefix('product')->group(function () {
        Route::get('/', [ProductController::class, 'index'])->name('product.index');
        Route::post('/store', [ProductController::class, 'store'])->name('product.store');
        Route::put('/update/{id}', [ProductController::class, 'update'])->name('product.update');
        Route::delete('/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
        Route::post('/update-stock/{id}', [ProductController::class, 'updateStock'])->name('product.update_stock');
    });

    Route::prefix('branch')->group(function () {
        Route::get('/detail/{id}', [BranchController::class, 'detail'])->name('branch.detail');
        Route::get('/report/{id}', [BranchController::class, 'getReports'])->name('branch.get_reports');
    });


    Route::prefix('revenue')->group(function () {
        Route::post('/store', [DashboardController::class, 'storeRevenueReport'])->name('revenue_report.store');
        Route::delete('/delete/{id}', [DashboardController::class, 'destroyRevenueReport'])->name('revenue_report.destroy');
    });
});
