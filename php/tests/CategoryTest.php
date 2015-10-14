<?php

namespace Example\Tests;

use Example\Category;

/**
 * Class to test the category class
 *
 * @category     Example
 * @author       Christian Seifert
 */
class CategoryTest extends \PHPUnit_Framework_TestCase
{
    /**
     * Tests the setting and returning of the title
     * @return bool
     */
    public function testTitleProperty()
    {
        $newName = 'example';

        $category = new Category();
        $category->setTitle($newName);

        $this->assertSame($newName, $category->getTitle(), 'The title is not as expected');
    }
}
