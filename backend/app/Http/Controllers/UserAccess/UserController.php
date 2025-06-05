<?php

namespace App\Http\Controllers\UserAccess;

use App\Models\User;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    //
    public function me()
    {
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'message' => 'User retrieved successfully',
                'data' => $user
            ]);
        } else {
            return response()->json([
                'message' => 'User not authenticated'
            ], 401);
        }
    }
}
