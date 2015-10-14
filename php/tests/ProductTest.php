<?php

namespace Example\Tests;

use Example\Category;
use Example\Product;

/**
 * Class to test the product class
 *
 * @category     Example
 * @author       Christian Seifert
 */
class ProductTest extends \PHPUnit_Framework_TestCase
{
    /**
     * Tests the setting and returning of the name
     * @return bool
     */
    public function testNameProperty()
    {
        $newName = 'example';

        $product = new Product();
        $product->setName($newName);

        $this->assertSame($newName, $product->getName(), 'The name is not as expected');
    }

    /**
     * Tests the setting and returning of the category
     * @return bool
     */
    public function testCategoryProperty()
    {
        $newCategory = new Category();
        $newCategory->setTitle('category');

        $product = new Product();
        $product->setCategory($newCategory);

        $this->assertInstanceOf('Example\Category', $product->getCategory(), 'The category is not instance of a Category class');
    }
}
