<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    // Login with hardcoded credentials
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if ($credentials['email'] === 'nara.sukadigital@gmail.com' && $credentials['password'] === 'nara@123') {
            // Store user in session
            $request->session()->put('user', [
                'id' => 1,
                'name' => 'JOKER DIGITAL',
                'email' => 'nara.sukadigital@gmail.com',
                'balance' => 130000000000,
                'point' => 0.8,
                'bonus' => 80000,
            ]);

            // Optional: regenerate session ID to prevent fixation
            $request->session()->regenerate();

            return response()->json([
                'message' => 'Logged in',
                'data' => $request->session()->get('user'),
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Logout by clearing session
    public function logout(Request $request)
    {
        $request->session()->forget('user');        // Remove user from session
        $request->session()->invalidate();          // Invalidate the session
        $request->session()->regenerateToken();     // Regenerate CSRF token

        return response()->json(['message' => 'Logged out successfully']);
    }

    // Return current user from session
    public function me(Request $request)
    {
        $user = $request->session()->get('user');

        if ($user) {
            return response()->json(['data' => $user]);
        }

        return response()->json(null, 401);
    }
}
