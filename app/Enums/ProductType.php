<?php

namespace App\Enums;

enum ProductType: string
{
    case IMPORT = 'import';
    case EXPORT = 'export';
}
