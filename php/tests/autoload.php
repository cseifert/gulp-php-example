<?php

require_once(__DIR__ . '/../../vendor/autoload.php');

spl_autoload_register(
    function ($class) {
        $processedClass = str_replace('Example\\', '', $class);
        $path = dirname(__DIR__) . DIRECTORY_SEPARATOR . str_replace('\\', DIRECTORY_SEPARATOR, ltrim($processedClass, '\\')) . '.php';

        if (file_exists($path)) {
            require $path;
        }
    }
);
