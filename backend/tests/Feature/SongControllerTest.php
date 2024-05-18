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

    // Retrieve the ID of the created song from the response
    $songId = $response->json('id');

    // Data to update the song
    $updatedSongData = [
        'name' => 'Thriller', // Updated song name
        'price' => '2500', // Updated song price
        'duration' => '240', // Updated song duration in seconds
        'mb' => '6', // Updated file size in MB
        'kbps' => '320', // Updated bitrate in kbps
        'gender' => 'pop', // Updated music genre
        'artist' => 'Michael Jackson', // Updated artist name
        'img' => 'new_image', // Updated image file name
        'song' => 'new_song' // Updated song file name
    ];

    // Send a PUT request to the '/api/Song/UpdateSong/{id}' endpoint with the updated song data
    $response = $this->putJson('/api/Song/UpdateSong/' . $songId, $updatedSongData);

    // Assert that the response has the HTTP status 200 (OK)
    $response->assertStatus(200)
             ->assertJson(['message' => 'Song updated Successfully']); // Verify the response message

    // Assert that the song data has been updated in the database
    $this->assertDatabaseHas('songs', [
        'id' => $songId,
        'name' => 'Thriller', // Updated song name
        'price' => '2500', // Updated song price
        'duration' => '240', // Updated song duration
        'mb' => '6', // Updated file size
        'kbps' => '320', // Updated bitrate
        'gender' => 'pop', // Updated genre
        'artist' => 'Michael Jackson', // Updated artist name
        'img' => 'new_image', // Updated image file name
        'song' => 'new_song' // Updated song file name
    ]);
}
}
