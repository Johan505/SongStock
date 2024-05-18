<?php

namespace Tests\Feature;

use App\Models\Rol\Rol;
use App\Models\User\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test the creation of a user.
     *
     * This method tests the user creation endpoint by sending a POST request
     * with user data, asserting the response status and structure, and verifying
     * that the user is stored in the database.
     *
     * @return void
     */
    public function test_create_user()
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
    }

    /**
     * Test user login with valid credentials.
     *
     * This method tests the user login endpoint by creating a user, sending a POST request
     * with valid credentials, asserting the response status and structure, and verifying
     * the returned user data.
     *
     * @return void
     */
    public function test_login_user_with_valid_credentials()
    {
        // Create a role to associate with the user
        $role = Rol::create([
            'rol' => 'Test Role',
        ]);

        // Create a user with valid credentials
        $user = User::create([
            'name' => 'Test User', // User's first name
            'lastname' => 'User Lastname', // User's last name
            'identification' => '123456789', // User's identification number
            'email' => 'test@example.com', // User's email address
            'phone' => '1234567890', // User's phone number
            'address' => '123 Test Street', // User's address
            'id_rol' => $role->id, // ID of the associated role
            'password' => Hash::make('password') // User's hashed password
        ]);

        // Valid login credentials
        $credentials = [
            'email' => 'test@example.com',
            'password' => 'password'
        ];

        // Send a POST request to the login endpoint
        $response = $this->postJson('/api/User/Login', $credentials);

        // Assert that the response status is 200 (OK)
        $response->assertStatus(200);

        // Assert that the response contains the access token and user data
        $response->assertJsonStructure(['access_token', 'token_type', 'user']);

        // Verify that the returned user data is correct
        $response->assertJsonFragment([
            'id' => $user->id,
            'email' => $user->email,
        ]);
    }

    /**
     * Test user login with invalid credentials.
     *
     * This method tests the user login endpoint by sending a POST request
     * with invalid credentials, asserting the response status and verifying
     * the error message.
     *
     * @return void
     */
    public function test_login_user_with_invalid_credentials()
    {
        // Invalid login credentials
        $credentials = [
            'email' => 'noexist@example.com',
            'password' => 'wrongpassword',
        ];

        // Send a POST request to the login endpoint with invalid credentials
        $response = $this->postJson('/api/User/Login', $credentials);

        // Assert that the response status is 401 (Unauthorized)
        $response->assertStatus(401)
                 ->assertJson(['message' => 'Credenciales incorrectas']); // Verify the error message
    }
}
