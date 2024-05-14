<?php

namespace App\Http\Controllers\SongController;

use App\Http\Controllers\Controller;
use App\Http\Requests\Song\createSong;
use App\Models\Song\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function getAllSongs()
    {
        $song = Song::all();
        return $song;
    }
    //
    public function createSong(createSong $request)
    {

        $validatedData = $request->validated();

        if ($request->hasFile('song')) {
            $publicacion = $request->file('song');
            $publicacionPath = $publicacion->storeAs('song', 'song' . time() . '.' . $publicacion->getClientOriginalExtension(), 'public');
            $validatedData['song'] = $publicacionPath;
        }

        $song = new Song($validatedData);
        $song->save();
        return response()->json(['message' => 'Song register Succesful'], 201);
    }
}
