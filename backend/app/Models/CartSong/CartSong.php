<?php

namespace App\Models\CartSong;

use App\Models\Song\Song;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartSong extends Model
{
    use HasFactory;

    protected $table = 'cartsong';

    protected $fillable = [
        'user_id',
        'song_id',
        'quantity'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function song()
    {
        return $this->belongsTo(Song::class, 'song_id');
    }
}
