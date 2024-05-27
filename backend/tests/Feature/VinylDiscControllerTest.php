<?php

namespace Tests\Feature;

use App\Models\Rol\Rol;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class VinylDiscControllerTest extends TestCase
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
    public function test_create_vinyl()
    {
        // Create a role to associate with the user
    $role = Rol::create([
        'rol' => 'Test Role',
    ]);

    // User data for the creation request
    $userData = [
        'name' => 'Test User', // User's first name
        'lastname' => 'User Lastname', // User's last name
        'identification' => '123456789', // User's identification number
        'email' => 'test@example.com', // User's email address
        'phone' => '1234567890', // User's phone number
        'address' => '123 Test Street', // User's address
        'id_rol' => $role->id, // ID of the associated role
        'password' => 'password', // User's password
        'password_confirmation' => 'password' // Password confirmation
    ];

    // Send a POST request to the user creation endpoint
    $response = $this->postJson('/api/User/CreateUser', $userData);

    // Assert that the response status is 201 (Created)
    $response->assertStatus(201)
             ->assertJson(['message' => 'User register Succesful']); // Verify the response message

    // Assert that the user is present in the database
    $this->assertDatabaseHas('users', [
        'email' => 'test@example.com',
        'id_rol' => $role->id,
    ]);

        // Data for the song to be used in the test
        $vinylData = [
            'name' => 'Thriller',
            'artist' => 'Michael Jackson',
            'releaseyear' => '1982-11-29',
            'price' => '2000',
            'amount' => '5',
            'format' => 'vinyl',
            'description' => 'Best Album',
            'state' => 'good',
            'condition' => 'excelent',
            'observations' => 'N/D',
            'img' => 'image'
        ];

        // Send a POST request to the '/api/Song/CreateSong' endpoint with the song data
        $response = $this->postJson('/api/Song/CreateSong', $vinylData);

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

/**
 * Test the update of a song by ID.
 *
 * This method tests the song update endpoint by creating a song,
 * retrieving its ID, sending a PUT request with updated song data,
 * and asserting the response status.
 *
 * @return void
 */
public function test_delete_song()
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

     // Enviar una solicitud DELETE para eliminar la canción
     $response = $this->deleteJson('/api/Song/DeleteSong/' . $songId);
}

}
