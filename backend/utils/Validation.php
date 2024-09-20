<?php
class Validation
{
    public static function validateFontFile($file)
    {
        $allowedExtension = 'ttf';
        $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);

        if ($file['size'] > 0 && strtolower($fileExtension) === $allowedExtension) {
            return true;
        }

        return false;
    }
}
