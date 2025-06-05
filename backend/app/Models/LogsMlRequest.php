<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LogsMlRequest extends Model
{
    //
    protected $table = "logs_ml_requests";
    protected $fillable = [
        'user_id',
        'input_skills',
        'result',
        'timestamp',
    ];
}
