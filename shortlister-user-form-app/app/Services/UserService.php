<?php

namespace App\Services;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Repositories\Interfaces\IUserRepository;

class UserService
{
    public function __construct(private IUserRepository $userRepository) {}

    public function all(FindAllUsersRequest $request): array
    {
        return $this->userRepository->all($request);
    }

    public function usersLenght(): int
    {
        return $this->userRepository->usersLenght();
    }

    public function create(CreateUserRequest $request)
    {
        return $this->userRepository->create($request);
    }
}
