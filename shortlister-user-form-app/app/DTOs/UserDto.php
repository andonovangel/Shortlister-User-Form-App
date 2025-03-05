<?php

namespace App\DTOs;

class UserDto
{
    public function __construct(
        public string $full_name,
        public string $email,
        public ?string $phone,
        public int $age,
    ) {}
}
