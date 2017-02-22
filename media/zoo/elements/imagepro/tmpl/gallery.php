<?php
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 *
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Alexander Oganov <t_tapak@yahoo.com>
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

$unique = $params->get('unique'); ?>

<li class="<?php echo $unique . ' ' . $unique . '-' . $this->index(); ?>">

    <a href="<?php echo $lightbox ? $url : 'javascript:void(0)'; ?>">

        <img class="etalage_thumb_image" src="<?php echo $url; ?>"
             width="<?php echo $width; ?>"
             height="<?php echo $height; ?>" />

        <img class="etalage_source_image" src="<?php echo $original->url; ?>"
             width="<?php echo $original->width; ?>"
             height="<?php echo $original->height; ?>"
             title="<?php echo $title; ?>"
             style="display: none;" />
    </a>

</li>

