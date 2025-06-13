<?php

namespace App\Http\Controllers\UserAccess;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CreatNewPassword extends Controller
{
    public function changePassword(Request $request)
    {
        // 1. Validasi Input
        $request->validate([
            'current_password' => ['required', 'string'],
            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
                'different:current_password', // <--- TAMBAHKAN ATURAN VALIDASI INI
            ],
        ]);

        // 2. Ambil user yang sedang login
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi.'
            ], 401);
        }

        // 3. Verifikasi password lama
        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password lama tidak cocok.'],
            ]);
        }

        // 4. Update password baru
        $user->password = Hash::make($request->password);
        $user->save();

        // 5. Berikan respons sukses
        return response()->json([
            'message' => 'Password berhasil diubah!'
        ], 200);
    }
}
