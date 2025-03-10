<?php

namespace App\Http\Controllers;

use App\DTOs\UserDto;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Models\User;
use App\Repositories\Interfaces\IUserRepository as UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index(FindAllUsersRequest $request): JsonResponse
    {
        $users = $this->userService->all($request);
        $userDto = collect($users)->map(function (User $user) {
            return new UserDto(
                $user->full_name,
                $user->email,
                $user->phone,
                $user->getAge()
            );
        });

        return response()->json($userDto, 200);
    }

    public function show(int $id): JsonResponse
    {
        $user = $this->userService->find($id);
        $userDto = new UserDto(
            $user->full_name,
            $user->email,
            $user->phone,
            $user->getAge()
        );

        return response()->json($userDto, 200);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request);
        $userDto = new UserDto(
            $user->full_name,
            $user->email,
            $user->phone,
            $user->getAge()
        );

        return response()->json($userDto, 201);
    }

    public function userCount(): int
    {
        return $this->userService->userCount();
    }
}
