<?php

namespace App\Enums;

enum StockMovementType: string
{
    case IMPORT = 'import';
    case EXPORT = 'export';
}
