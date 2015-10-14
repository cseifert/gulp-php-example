<?php

namespace Example;

/**
 * A class representing a product
 *
 * @category     Example
 * @author       Christian Seifert
 */
class Product
{
    /**
     * Name of the product
     * @var string
     */
    protected $name = '';

    /**
     * Assigned category of the product
     * @var Category
     */
    protected $category = null;

    /**
     * Sets a new name
     * @param string $newName
     */
    public function setName($newName)
    {
        $this->name = $newName;
    }

    /**
     * Returns the name of the product
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Sets the new category
     * @param Category $newCategory
     */
    public function setCategory(Category $newCategory)
    {
        $this->category = $newCategory;
    }

    /**
     * Returns the category
     * @return Category
     */
    public function getCategory()
    {
        return $this->category;
    }
}
