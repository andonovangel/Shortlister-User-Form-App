<?php

namespace App\Repositories;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Models\User;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Support\Facades\DB;

class UserRepository implements IUserRepository
{
    public function all(FindAllUsersRequest $request): array
    {
        return User::paginate($request->per_page)->items();
    }

    public function usersLenght(): int {
        return User::count();
    }

    public function create(CreateUserRequest $request): User
    {
        return User::create($request->all());
    }
}
