<?php
/**
 * @package   com_zoo
 * @author    YOOtheme http://www.yootheme.com
 * @copyright Copyright (C) YOOtheme GmbH
 * @license   http://www.gnu.org/licenses/gpl.html GNU/GPL
 */

// no direct access
defined('_JEXEC') or die('Restricted access');

// include assets css/js
$this->app->document->addStylesheet($this->template->resource.'assets/css/style.css');

// add page title
$page_title = sprintf(($this->item->id ? JText::_('Edit %s') : JText::_('Add %s')), $this->type->name);
$this->app->document->setTitle($page_title);

$css_class = $this->application->getGroup().'-'.$this->template->name;

?>

<div id="system" class="yoo-zoo <?php echo $css_class; ?> <?php echo $css_class.'-'.$this->submission->alias; ?>">

	<div class="submission">

		<h1 class="headline"><?php echo $page_title;?></h1>

		<?php echo $this->partial('submission');	?>

	</div>

</div>