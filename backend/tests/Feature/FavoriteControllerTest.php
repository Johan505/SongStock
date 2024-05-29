<?php

namespace Tests\Feature;

use App\Models\Rol\Rol;
use App\Models\Song\Song;
use App\Models\User\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FavoriteControllerTest extends TestCase
{
    use RefreshDatabase;

/**
 * Test the update of a song by ID.
 *
 * This method tests the song update endpoint by creating a song,
 * retrieving its ID, sending a PUT request with updated song data,
 * and asserting the response status.
 *
 * @return void
 */
public function test_add_favorite()
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

    $favoriteData = [
        'user_id' => '1',
        'song_id' => '1'
    ];

     // Crear un favorito
     $response = $this->postJson('/api/Favorite/addFavorite', $favoriteData);
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
public function test_delete_favorite()
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

    $favoriteData = [
        'user_id' => '1',
        'song_id' => '1'
    ];

     // Crear un favorito
     $response = $this->postJson('/api/Favorite/addFavorite', $favoriteData);
     // Enviar una solicitud para eliminar el favorito
    $response = $this->postJson('/api/Favorite/addFavorite', $favoriteData);
}
}
