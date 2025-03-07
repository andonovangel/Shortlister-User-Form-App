<?php

namespace App\Services;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Models\User;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Database\Eloquent\Collection;

class UserService
{
    public function __construct(private IUserRepository $userRepository) {}

    public function all(FindAllUsersRequest $request): array|Collection
    {
        return $this->userRepository->all($request);
    }

    public function show(int $id): User
    {
        return $this->userRepository->find($id);
    }

    public function usersLenght(): int
    {
        return $this->userRepository->usersLenght();
    }

    public function create(CreateUserRequest $request): User
    {
        return $this->userRepository->create($request);
    }
}
