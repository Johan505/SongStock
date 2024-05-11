<?php

namespace App\Models\Song;

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
}
