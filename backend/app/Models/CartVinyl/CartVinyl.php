<?php

namespace App\Models\CartVinyl;

use App\Models\User\User;
use App\Models\VinylDisc\VinylDisc;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartVinyl extends Model
{
    use HasFactory;

    protected $table = 'cartvinyl';

    protected $fillable = [
        'user_id',
        'vinyl_id',
        'quantity'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function vinyldisc()
    {
        return $this->belongsTo(VinylDisc::class, 'vinyl_id');
    }
}
