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


$align  = $this->app->jbitem->getMediaAlign($item, $layout);
$tabsId = $this->app->jbstring->getId('tabs');

?>

<div class="uk-panel uk-clearfix">
    <?php if ($this->checkPosition('title')) : ?>
        <h1 class="item-title"><?php echo $this->renderPosition('title'); ?></h1>
    <?php endif; ?>

    <div class="uk-grid">
        <?php if ($this->checkPosition('image')) : ?>
            <div class="uk-width-1-1">
                <div class="item-image">
                    <?php echo $this->renderPosition('image'); ?>
                </div>
            </div>
        <?php endif; ?>

        <?php if ($this->checkPosition('meta')) : ?>
            <div class="uk-width-1-1">
                <div class="item-metadata">
                    <ul class="uk-list">
                        <?php echo $this->renderPosition('meta', array('style' => 'list')); ?>
                    </ul>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>

<div class="tab-container uk-article-divider">
    <ul class="uk-tab" data-uk-tab="{connect:'#<?php echo $tabsId; ?>'}">
        <?php if ($this->checkPosition('general')) : ?>
            <li>
                <a href="#tab-general">
                    <?php echo "Общие сведения" ?>
                </a>
            </li>
        <?php endif; ?>
        <?php if ($this->checkPosition('water')) : ?>
            <li>
                <a href="#tab-water">
                    <?php echo "Параметры воды" ?>
                </a>
            </li>
        <?php endif; ?>

        <?php if ($this->checkPosition('food')) : ?>
            <li>
                <a href="#tab-food">
                    <?php echo JText::_('Питание'); ?>
                </a>
            </li>
        <?php endif; ?>

        <?php if ($this->checkPosition('mantainance')) : ?>
            <li>
                <a href="#tab-mantainance">
                    <?php echo JText::_('Содержание'); ?>
                </a>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('breeding')) : ?>
            <li>
                <a href="#tab-breeding">
                    <?php echo JText::_('Разведение'); ?>
                </a>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('comment')) : ?>
            <li>
                <a href="#tab-comment">
                    <?php echo JText::_('Комментарий'); ?>
                </a>
            </li>
        <?php endif; ?>
    </ul>

    <ul class="uk-switcher uk-margin" id="<?php echo $tabsId; ?>">
        <?php if ($this->checkPosition('general')) : ?>
            <li id="tab-general">
                <div class="item-text">
                    <?php echo $this->renderPosition('general', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('water')) : ?>
            <li id="tab-water">
                <div class="item-text">
                    <?php echo $this->renderPosition('water', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('food')) : ?>
            <li id="tab-food">
                <div class="item-text">
                    <?php echo $this->renderPosition('food', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('mantainance')) : ?>
            <li id="tab-mantainance">
                <div class="item-text">
                    <?php echo $this->renderPosition('mantainance', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('breeding')) : ?>
            <li id="tab-breeding">
                <div class="item-text">
                    <?php echo $this->renderPosition('breeding', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
        
        <?php if ($this->checkPosition('comment')) : ?>
            <li id="tab-comment">
                <div class="item-text">
                    <?php echo $this->renderPosition('comment', array('style' => 'block')); ?>
                </div>
            </li>
        <?php endif; ?>
    </ul>
</div>