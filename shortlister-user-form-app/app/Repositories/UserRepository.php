<?php

namespace App\Repositories;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\FindAllUsersRequest;
use App\Models\User;
use App\Repositories\Interfaces\IUserRepository;
use Illuminate\Database\Eloquent\Collection;

class UserRepository implements IUserRepository
{
    public function all(FindAllUsersRequest $request): array|Collection
    {
        if ($request->has('per_page')) {
            return User::paginate($request->per_page)->items();
        }
        return User::all();
    }

    public function find(int $id): User
    {
        return User::findOrFail($id);
    }

    public function usersLenght(): int {
        return User::count();
    }

    public function create(CreateUserRequest $request): User
    {
        return User::create($request->all());
    }
}
