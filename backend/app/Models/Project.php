<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'goal_money',
        'state_money',
        'user_id',
    ];

    public function economy()
    {
        return $this->hasMany(Economy::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
