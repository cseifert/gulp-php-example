# gulp-php-example
This repository is a simple Gulp example for PHP integrating PHPUnit, PHPlint, PHP_CodeSniffer, PHP Mess Detector, PHP Copy/Paste Detector, PHP Codebeautifier, PHP_Depend and PHPDoc.

## Installation
At first, clone this repository to the location of your choice. Then install the required dependencies by:
```sh
composer install
sudo npm install
```

The php folder includes some sample PHP files. You can find according example unit test cases in the folder "tests".

## Gulp commands
Having all setup you can use the following commands (according to gulpfile.js):

### PHPLint
Starts phplint
```sh
gulp phplint
```

### PHP_CodeSniffer
Starts the code sniffer using PSR-2 coding standard
```sh
gulp phpcse
```

### PHP Codebeautifier
Starts the code beautifier using PSR-2 coding standard
```sh
gulp phpcbf
```

### PHP Mess Detector
Starts the mess detector
```sh
gulp phpmd
```

### PHP_Depend
Starts the metrics generator
```sh
gulp pdepend
```

### PHP Copy/Paste Detector
Starts the copy/paste detector
```sh
gulp phpcpd
```

### PHPUnit
Starts the unit tests
```sh
gulp phpunit
```

### PHPDoc
Generates an API documentation of the PHP files
```sh
gulp phpdoc
```

### Watch
Watches the folder "php" for changes in php files and runs 'phplint', 'phpcs', 'phpunit', 'phpmd' and 'phpcpd'
```sh
gulp watch
```