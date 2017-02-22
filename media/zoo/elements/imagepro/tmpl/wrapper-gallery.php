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

$unique = uniqid('jbzoo-gallery-');
$class = $params->get('unique'); ?>

<div class="jbzoo-gallery-pro <?php echo $class; ?>">

    <ul class="<?php echo $unique; ?>">

        <?php echo $elements; ?>

    </ul>

</div>

<div style="display: none;">
    <div class="jbzoo-zoom-hidden"></div>
</div>

<script type="text/javascript">

    jQuery(document).ready(function () {
        jQuery('.<?php echo $unique; ?>').etalage({
            <?php if (!$params->get('zoom')) : ?>
            zoom_element              : '.jbzoo-zoom-hidden',
            magnifier_opacity         : 1,
            <?php endif;

             if ($params->get('lightbox')) : ?>
            click_callback            : function etalage_click_callback(image_anchor, instance_id) {
                jQuery.fancybox.open({
                    href: image_anchor
                });
            },
            <?php endif; ?>
            show_hint                 : false,
            small_thumbs              : <?php echo $params->get('images') ?>,
            zoom_area_height          : <?php echo $params->get('zoom_width') ?>,
            zoom_area_width           : <?php echo $params->get('zoom_height') ?>,
            thumb_image_width         : <?php echo $params->get('width') ?>,
            thumb_image_height        : <?php echo $params->get('height') ?>,
            source_image_width        : '<?php echo $params->get('zoom_img_width') ?>',
            source_image_height       : '<?php echo $params->get('zoom_img_height') ?>',
            show_descriptions         : <?php echo ($params->get('show_title') ? 'true' : 'false') ?>,
            show_begin_end_smallthumb : <?php echo ($params->get('navigation') ? 'true' : 'false') ?>,
            smallthumbs_position      : '<?php echo $params->get('thumb_pos') ?>',
            smallthumb_select_on_hover: <?php echo ($params->get('change') ? 'true' : 'false') ?>,
            autoplay                  : <?php echo ($params->get('autoplay') ? 'true' : 'false') ?>,
            autoplay_interval         : <?php echo $params->get('interval'); ?>
        });
    });
</script>