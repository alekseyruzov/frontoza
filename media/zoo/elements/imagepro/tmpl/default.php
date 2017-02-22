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

if ($ref == 0) : ?>
    <img src="<?php echo $url; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>"
         title="<?php echo $title; ?>" />
<?php elseif ($ref == 2) : ?>
    <a class="<?php echo $this->identifier ?>" href="<?php echo $original->url ?>">
        <img src="<?php echo $url; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>"
             title="<?php echo $title; ?>" />
    </a>
    <script type="text/javascript">
        jQuery('a.<?php echo $this->identifier; ?>').fancybox({
            transitionIn : 'none',
            transitionOut: 'none',
            speedIn      : 600,
            speedOut     : 200,
            overlayShow  : false
        });
    </script>
<?php
else : ?>
    <a href="<?php echo JRoute::_($link, false); ?>">
        <img src="<?php echo $url; ?>" width="<?php echo $width; ?>" height="<?php echo $height; ?>"
             title="<?php echo $title; ?>" />
    </a>
<?php endif;