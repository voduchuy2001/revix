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

    Route::get('/repair-ticket', [RepairTicketController::class, 'index'])->name('repair_ticket.index');
    Route::get('/repair-ticket/create', [RepairTicketController::class, 'create'])->name('repair_ticket.create');
    Route::post('/repair-ticket/store', [RepairTicketController::class, 'store'])->name('repair_ticket.store');
    Route::delete('/repair-ticket/delete/{id}', [RepairTicketController::class, 'destroy'])->name('repair_ticket.destroy');
    Route::get('/repair-ticket/print/{id}', [RepairTicketController::class, 'print'])->name('repair_ticket.print');
    Route::get('/repair-ticket/edit/{id}', [RepairTicketController::class, 'edit'])->name('repair_ticket.edit');
    Route::put('/repair-ticket/update/{id}', [RepairTicketController::class, 'update'])->name('repair_ticket.update');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/user/store', [UserController::class, 'store'])->name('user.store');
    Route::put('/user/update/{id}', [UserController::class, 'update'])->name('user.update');
    Route::get('/user', [UserController::class, 'getUsers'])->name('user.index');
    Route::get('/customer', [UserController::class, 'getCustomers'])->name('customer.index');
    Route::delete('/user/delete/{id}', [UserController::class, 'destroy'])->name('user.destroy');

    Route::get('/product', [ProductController::class, 'index'])->name('product.index');
    Route::post('/product/store', [ProductController::class, 'store'])->name('product.store');
    Route::put('/product/update/{id}', [ProductController::class, 'update'])->name('product.update');
    Route::delete('/product/delete/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
    Route::post('/product/update-stock/{id}', [ProductController::class, 'updateStock'])->name('product.update_stock');

    Route::get('/brand/detail/{id}', [BranchController::class, 'detail'])->name('branch.detail');
});
