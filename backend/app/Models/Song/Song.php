<?php

namespace App\Models\Song;

use App\Models\CartSong\CartSong;
use App\Models\CartVinyl\CartVinyl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    use HasFactory;

    protected $table = 'songs';

    protected $fillable = [
        'name',
        'price',
        'duration',
        'mb',
        'kbps',
        'gender',
        'artist',
        'img',
        'song'
    ];

    public function cartsong()
    {
        return $this->hasMany(CartSong::class, 'song_id');
    }

    public function cartsvinyl()
    {
        return $this->hasMany(CartVinyl::class, 'vinyl_id');
    }
}
