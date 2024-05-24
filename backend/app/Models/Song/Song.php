<?php

namespace App\Models\Song;

use App\Models\Cart\Cart;
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

    public function carts()
    {
        return $this->hasMany(Cart::class, 'song_id');
    }
}
