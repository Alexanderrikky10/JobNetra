<?php

namespace App\Http\Controllers\predicts;

use Illuminate\Http\Request;
use App\Models\LogsMlRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PredictionController extends Controller
{
    //pemerosesan prediksi skill
    public function predict(Request $request)
    {
        // Validasi input
        $request->validate([
            'input_skills' => 'required|string', // karena kamu simpan sebagai string
        ]);

        // Ambil user ID dari Auth
        $userId = Auth::id();

        // Simpan ke tabel logs_ml_requests
        $log = LogsMlRequest::create([
            'user_id' => $userId,
            'input_skills' => $request->input_skills,
            'timestamp' => now(),
        ]);

        try {
            // Kirim skill ke API ML eksternal
            $mlResponse = Http::post('http://127.0.0.1:5000/processing', [
                'skills' => $request->input_skills
            ]);

            if ($mlResponse->successful()) {
                $prediction = $mlResponse->json();

                // Simpan hasil prediksi ke kolom 'result'
                $log->update([
                    'result' => json_encode(value: $prediction)
                ]);

                return response()->json([
                    'message' => 'Prediction successful',
                    'data' => $prediction
                ]);
            } else {
                return response()->json([
                    'message' => 'ML API returned an error',
                    'error' => $mlResponse->body()
                ], 502);
            }

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error connecting to ML API',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
