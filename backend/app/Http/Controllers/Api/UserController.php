<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use OpenApi\Annotations as OA;

class UserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/user/list",
     *     summary="User list",
     *     tags={"User"},
     *     @OA\Response(
     *         response=200,
     *         description="user list",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="pong")
     *         )
     *     )
     * )
     */
    public function list()
    {
        try {
            $users = \App\Models\User::all();
            return response()->json([
                'message' => 'success',
                'data' => $users
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to retrieve users',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}