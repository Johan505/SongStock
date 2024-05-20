<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SongControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the creation of a song.
     *
     * This method tests the song creation endpoint by sending a POST request
     * with song data and asserting the response status.
     *
     * @return void
     */
    public function test_create_song()
    {
        // Data for the song to be used in the test
        $songData = [
            'name' => 'Billie Jean', // Song name
            'price' => '2000', // Song price
            'duration' => '158', // Song duration in seconds
            'mb' => '5', // File size in MB
            'kbps' => '320', // Bitrate in kbps
            'gender' => 'pop', // Music genre
            'artist' => 'Michael Jackson', // Artist name
            'img' => 'image', // Image file name
            'song' => 'song' // Song file name
        ];

        // Send a POST request to the '/api/Song/CreateSong' endpoint with the song data
        $response = $this->postJson('/api/Song/CreateSong', $songData);

        // Assert that the response has the HTTP status 201 (Created)
        $response->assertStatus(201);
    }


/**
 * Test the update of a song by ID.
 *
 * This method tests the song update endpoint by creating a song,
 * retrieving its ID, sending a PUT request with updated song data,
 * and asserting the response status.
 *
 * @return void
 */
public function test_update_song_by_id()
{
    // Datos para la creación de la canción
    $songData = [
        'name' => 'Billie Jean',
        'price' => '2000',
        'duration' => '158',
        'mb' => '5',
        'kbps' => '320',
        'gender' => 'pop',
        'artist' => 'Michael Jackson',
        'img' => 'image',
        'song' => 'song'
    ];

    // Crear una nueva canción
    $response = $this->postJson('/api/Song/CreateSong', $songData);
    $response->assertStatus(201);

    // Obtener el ID de la canción creada desde la respuesta
    $songId = $response->json('id');
    $this->assertNotNull($songId, 'El ID de la canción no debe ser nulo.');

    // Datos actualizados para la canción
    $updatedSongData = [
        'name' => 'Thriller',
        'price' => '2500',
        'duration' => '240',
        'mb' => '6',
        'kbps' => '320',
        'gender' => 'pop',
        'artist' => 'Michael Jackson',
        'img' => 'new_image',
        'song' => 'new_song'
    ];

    // Enviar una solicitud PUT para actualizar la canción
    $response = $this->postJson('/api/Song/UpdateSong/' . $songId, $updatedSongData);

    // Verificar que la respuesta tiene el estado HTTP 200 (OK)
    $response->assertStatus(200)
             ->assertJson(['message' => 'Song updated Successfully']);

    // Verificar que la base de datos tiene los datos actualizados de la canción
    $this->assertDatabaseHas('songs', [
        'id' => $songId,
        'name' => 'Thriller',
        'price' => '2500',
        'duration' => '240',
        'mb' => '6',
        'kbps' => '320',
        'gender' => 'pop',
        'artist' => 'Michael Jackson',
        'img' => 'new_image',
        'song' => 'new_song'
    ]);
}
}
