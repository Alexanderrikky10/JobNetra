<?php

namespace App\Http\Controllers\UserAccess;

use App\Http\Controllers\Controller;
use App\Models\LogsMlRequest;
use Illuminate\Http\Request;
use Log;

class HistoryController extends Controller
{
    //
    public function index()
    {
        $user = auth()->user();

        $latestLog = LogsMlRequest::where('user_id', $user->id)
            ->orderBy('timestamp', 'desc')
            ->first();

        return response()->json([
            'message' => 'Latest log retrieved successfully',
            'data' => $latestLog
        ]);
    }
}
