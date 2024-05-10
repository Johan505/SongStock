<?php

namespace App\Http\Controllers\SongController;

use App\Http\Controllers\Controller;
use App\Http\Requests\Song\createSong;
use App\Models\Song\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    //
    public function createSong(createSong $request)
    {
        // La validación se maneja automáticamente por Laravel

        $songData = $request->all();
        Song::create($songData);
        return response()->json(['message' => 'Song register Succesful'], 201);
    }
}
