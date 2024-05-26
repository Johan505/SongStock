<?php

namespace App\Http\Controllers\SongController;

use App\Http\Controllers\Controller;
use App\Http\Requests\Song\ReqSong;
use App\Models\Favorite\Favorite;
use App\Models\Song\Song;
use Illuminate\Http\Request;

class SongController extends Controller
{
    public function getAllSongs()
    {
        $song = Song::all();
        return $song;
    }

    public function createSong(ReqSong $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('song')) {
            $songFile = $request->file('song');
            $songPath = $songFile->storeAs('song', 'song' . time() . '.' . $songFile->getClientOriginalExtension(), 'public');
            $validatedData['song'] = $songPath;
        }

        if ($request->hasFile('img')) {
            $imageFile = $request->file('img');
            $imagePath = $imageFile->storeAs('images', 'image' . time() . '.' . $imageFile->getClientOriginalExtension(), 'public');
            $validatedData['img'] = $imagePath;
        }

        $song = new Song($validatedData);
        $song->save();

        return response()->json(['message' => 'Song register Successful', 'id' => $song->id], 201);
    }

    public function updateSong(ReqSong $request, $id)
    {
        $song = Song::find($id);

        if (!$song) {
            return response()->json(['message' => 'Song not found'], 404);
        }

        $validatedData = $request->validated();

        if ($request->hasFile('song')) {
            $songFile = $request->file('song');
            $songPath = $songFile->storeAs('song', 'song' . time() . '.' . $songFile->getClientOriginalExtension(), 'public');
            $validatedData['song'] = $songPath;
        }

        if ($request->hasFile('img')) {
            $imageFile = $request->file('img');
            $imagePath = $imageFile->storeAs('images', 'image' . time() . '.' . $imageFile->getClientOriginalExtension(), 'public');
            $validatedData['img'] = $imagePath;
        }

        $song->update($validatedData);

        return response()->json(['message' => 'Song updated Successfully'], 200);
    }

    public function showSong($id)
    {
        $song = Song::find($id);
        return $song;
    }

    public function deleteSong($id)
    {
        $song = Song::destroy($id);
        return $id;
    }

    public function addFavorite(Request $request)
    {
        $userId = $request->input('user_id');
        $songId = $request->input('song_id');

        $existingFavorite = Favorite::where('user_id', $userId)
            ->where('song_id', $songId)
            ->first();

        if ($existingFavorite) {
            $existingFavorite->delete();
            return response()->json(['message' => 'Favorite deleted successfully'], 200);
        } else {
            $favorite = new Favorite($request->all());
            $favorite->save();
            return response()->json(['message' => 'Favorite created successfully'], 201);
        }
    }

    public function getFavorites($id)
    {
        $favorites = Favorite::where('user_id', $id)
            ->get();
        $favorites->load('user');
        $favorites->load('song');
        return $favorites;
    }

    public function favoritebyid($id)
    {
        $favorites = Favorite::find($id);
        return $favorites;
    }
}
