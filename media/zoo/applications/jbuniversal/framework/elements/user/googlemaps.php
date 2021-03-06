<?php
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Denis Smetannikov <denis@jbzoo.com>
 */

// no direct access
defined('_JEXEC') or die('Restricted access');


/**
 * Class JBCSVItemUserGooglemaps
 */
class JBCSVItemUserGooglemaps extends JBCSVItem
{
    /**
     * @return string
     */
    public function toCSV()
    {
        if (isset($this->_value['location'])) {
            return $this->_value['location'];
        }

        return '';
    }

    /**
     * @param $value
     * @param null $position
     * @return Item|void
     */
    public function fromCSV($value, $position = null)
    {
        $value = $this->_getString($value);
        $this->_element->bindData(array('location' => trim($value)));

        return $this->_item;
    }

}
