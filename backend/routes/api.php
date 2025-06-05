<?php

use App\Http\Controllers\UserAccess\HistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\UserAccess\UserController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\UserAccess\CreatNewPassword;
use App\Http\Controllers\predicts\PredictionController;
use App\Http\Controllers\Auth\PasswordResetLinkController;



Route::prefix('v1')->group(function () {
    //  auth-user
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::delete('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

    // cek token user apakah masih ada
    Route::get('/me', [UserController::class, 'me'])->middleware('auth:sanctum');




    // reset password email
    Route::post('/resetPassword', [PasswordResetLinkController::class, 'store']);
    Route::post('/NewPassword', [NewPasswordController::class, 'store'])->name('password.reset'); // pastikan nama route sesuai dengan yang digunakan di frontend


    // reset password form 
    Route::patch('/changepassword', [CreatNewPassword::class, 'changePassword'])->middleware('auth:sanctum');


    // prediction skill
    Route::post('/predict', [PredictionController::class, 'predict'])->middleware('auth:sanctum');
    
    Route::get('/history', [HistoryController::class, 'index'])->middleware('auth:sanctum');
});
