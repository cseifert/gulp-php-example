<?php

namespace Example;

/**
 * A class representing a category
 *
 * @category     Example
 * @author       Christian Seifert
 */
class Category
{
    /**
     * title of the category
     * @var string
     */
    protected $title = '';

    /**
     * Sets a new title
     * @param $newTitle
     */
    public function setTitle($newTitle)
    {
        $this->title = $newTitle;
    }

    /**
     * Returns the title of the product
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }
}
