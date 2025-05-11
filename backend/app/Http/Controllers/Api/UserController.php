<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use OpenApi\Annotations as OA;
use Illuminate\Support\Facades\DB;

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
        $user = DB::table("users")->select("id","name","email")->get();

        if (empty($users)) {
            return response()->json([
                'status_code' => 404,
                'message' => 'Data not found'
            ], 404);
        }

        return response()->json([
            'status_code' => 200,
            'data' => $users
        ]);
    }
}