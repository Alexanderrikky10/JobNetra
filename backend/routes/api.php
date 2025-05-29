<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;



Route::prefix('v1')->group(function () {
    //  auth-user
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    // cek token user apakah masih ada
    Route::get('/me', [AuthController::class, 'me']);

    // reset password
    Route::post('/resetPassword', [PasswordResetLinkController::class, 'store']);
    Route::post('/NewPassword', [NewPasswordController::class, 'store'])->name('password.reset'); // pastikan nama route sesuai dengan yang digunakan di frontend

});
