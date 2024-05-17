<?php

namespace App\Http\Controllers\SongController;

use App\Http\Controllers\Controller;
use App\Http\Requests\Song\ReqSong;
use App\Models\Song\Song;

class SongController extends Controller
{
    public function getAllSongs()
    {
        $song = Song::all();
        return $song;
    }
    //
    public function createSong(ReqSong $request)
{
    $validatedData = $request->validated();

    if ($request->hasFile('song')) {
        $songFile = $request->file('song');
        $songPath = $songFile->storeAs('song', 'song' . time() . '.' . $songFile->getClientOriginalExtension(), 'public');
        $validatedData['song'] = $songPath;
    }

    if ($request->hasFile('img')) { // Verifica si hay un archivo de imagen en la solicitud
        $imageFile = $request->file('img'); // Obtiene el archivo de imagen de la solicitud
        $imagePath = $imageFile->storeAs('images', 'image' . time() . '.' . $imageFile->getClientOriginalExtension(), 'public'); // Almacena el archivo de imagen
        $validatedData['img'] = $imagePath; // Asigna la ruta del archivo de imagen al atributo 'img' en los datos validados
    }

    $song = new Song($validatedData); // Crea una nueva instancia de Song con los datos validados
    $song->save(); // Guarda la canción en la base de datos

    return response()->json(['message' => 'Song register Successful'], 201); // Retorna una respuesta exitosa
}

public function updateSong(ReqSong $request, $id)
    {
        // Recupera el registro existente
        $Song = Song::findOrFail($id);

        // Aplica las validaciones
        $validatedData = $request->validated();

        // Actualiza los datos del registro
        $Song->update($validatedData);

        return response()->json(['message' => 'Song updated Succesfully'], 200);
    }

    public function showSong($id)
    {
        $Song = Song::find($id);
        return $Song;
    }

    public function deleteSong($id)
    {
        $Song = Song::destroy($id);
        return $Song;
    }

}
