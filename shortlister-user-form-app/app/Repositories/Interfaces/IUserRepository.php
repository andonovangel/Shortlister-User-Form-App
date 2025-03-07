<?php

namespace App\Repositories\Interfaces;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

interface IUserRepository
{
    public function all(FindAllUsersRequest $request): array|Collection;
    public function find(int $id): User;
    public function usersLenght(): int;
    public function create(CreateUserRequest $request): User;
}
