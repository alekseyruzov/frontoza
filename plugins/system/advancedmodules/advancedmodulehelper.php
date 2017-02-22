<?php
/**
 * Plugin Module Helper File
 *
 * @package         Advanced Module Manager
 * @version         4.16.0
 *
 * @author          Peter van Westen <peter@nonumber.nl>
 * @link            http://www.nonumber.nl
 * @copyright       Copyright © 2014 NoNumber All Rights Reserved
 * @license         http://www.gnu.org/licenses/gpl-2.0.html GNU/GPL
 */

defined('_JEXEC') or die;

jimport('joomla.filesystem.file');

/*
 * ModuleHelper methods
 */

class plgSystemAdvancedModuleHelper
{
	public function onRenderModule(&$module)
	{
		// return false if is not frontend
		if (!JFactory::getApplication()->isSite())
		{
			return false;
		}

		$config = $this->getConfig();

		// return false if show_hideempty is off in main config
		if (!$config->show_hideempty)
		{
			return false;
		}

		// return false if hideempty is off in module params
		if (!isset($module->advancedparams) || !isset($module->advancedparams->hideempty) || !$module->advancedparams->hideempty)
		{
			return false;
		}

		$content = trim($module->content);
		// return true if module is empty
		if ($content == '')
		{
			// return true will prevent the module from outputting html
			return true;
		}

		// remove html and hidden whitespace
		$content = str_replace(chr(194) . chr(160), ' ', $content);
		$content = str_replace(array('&nbsp;', '&#160;'), ' ', $content);
		// remove comment tags
		$content = preg_replace('#<\!--.*?-->#si', '', $content);
		// remove all closing tags
		$content = preg_replace('#</[^>]+>#si', '', $content);
		// remove tags to be ignored
		$tags = 'p|div|span|strong|b|em|i|ul|font|br|h[0-9]|fieldset|label|ul|ol|li|table|thead|tbody|tfoot|tr|th|td|form';
		$s = '#<(' . $tags . ')([^a-z0-9>][^>]*)?>#si';
		if (@preg_match($s . 'u', $content))
		{
			$s .= 'u';
		}
		if (preg_match($s, $content))
		{
			$content = preg_replace($s, '', $content);
		}
		// return true if module is empty
		if (trim($content) == '')
		{
			// return true will prevent the module from outputting html
			return true;
		}

		return false;
	}

	public function onCreateModuleQuery(&$query)
	{
		// return if is not frontend
		if (!JFactory::getApplication()->isSite())
		{
			return;
		}

		foreach ($query as $type => $strings)
		{
			foreach ($strings as $i => $string)
			{
				if ($type == 'select')
				{
					$query->{$type}[$i] = str_replace(', mm.menuid', '', $string);
				}
				else if (strpos($string, 'mm.') !== false || strpos($string, 'm.publish_') !== false)
				{
					unset($query->{$type}[$i]);
				}
			}
		}
		$query->select[] = 'am.params as advancedparams, 0 as menuid, m.publish_up, m.publish_down';
		$query->join[] = '#__advancedmodules as am ON am.moduleid = m.id';
		$query->order = array('m.ordering, m.id');
	}

	public function onPrepareModuleList(&$modules)
	{
		// return if is not frontend
		if (!JFactory::getApplication()->isSite())
		{
			return;
		}

		jimport('joomla.filesystem.file');

		require_once JPATH_PLUGINS . '/system/nnframework/helpers/parameters.php';
		$parameters = NNParameters::getInstance();

		require_once JPATH_PLUGINS . '/system/nnframework/helpers/assignments.php';
		$assignments = new NNFrameworkAssignmentsHelper;

		$xmlfile_assignments = JPATH_ADMINISTRATOR . '/components/com_advancedmodules/assignments.xml';

		$config = $this->getConfig();

		// set params for all loaded modules first
		// and make it an associated array (array id = module id)
		$new_modules = array();
		require_once JPATH_ADMINISTRATOR . '/components/com_advancedmodules/models/module.php';
		$model = new AdvancedModulesModelModule;
		foreach ($modules as $id => $module)
		{
			if (!isset($module->advancedparams))
			{
				$module->advancedparams = $this->getAdvancedParams($id);
			}
			$registry = new JRegistry;
			$registry->loadString($module->advancedparams);
			$module->advancedparams = $registry->toArray();
			if (
				!isset($module->advancedparams['assignto_menuitems'])
				|| isset($module->advancedparams['assignto_urls_selection_sef'])
				|| (
					!is_array($module->advancedparams['assignto_menuitems'])
					&& strpos($module->advancedparams['assignto_menuitems'], '|') !== false
				)
			)
			{
				$module->advancedparams = $model->initAssignments($module->id, $module);
				$registry->loadArray($module->advancedparams);
			}
			$module->advancedparams = $registry->toObject();
			$module->advancedparams = $parameters->getParams($module->advancedparams, $xmlfile_assignments);
			$new_modules[$module->id] = $module;
		}
		$modules = $new_modules;
		unset($new_modules);

		foreach ($modules as $id => $module)
		{
			if ($module->advancedparams === 0)
			{
				continue;
			}

			$extraparams = array();
			for ($i = 1; $i <= 5; $i++)
			{
				$var = 'extra' . $i;
				$extraparams[$var] = isset($module->advancedparams->{$var}) ? $module->advancedparams->{$var} : '';
			}
			if (!empty($extraparams))
			{
				$registry = new JRegistry;
				$registry->loadString($module->params);
				$module->params = $registry->toArray();
				$module->params = array_merge($module->params, $extraparams);
				$registry = new JRegistry;
				$registry->loadArray($module->params);
				$module->params = $registry->toString();
			}
			$module->reverse = 0;

			if (!isset($module->published))
			{
				$module->published = 0;
			}
			// Check if module should mirror another modules assignment settings
			if ($module->published)
			{
				$count = 0;
				while ($count++ < 10
					&& isset($module->advancedparams->mirror_module)
					&& $module->advancedparams->mirror_module
					&& isset($module->advancedparams->mirror_moduleid)
					&& !empty($module->advancedparams->mirror_moduleid)
				)
				{
					if (is_array($module->advancedparams->mirror_moduleid))
					{
						$module->advancedparams->mirror_moduleid = (int) $module->advancedparams->mirror_moduleid['0'];
					}
					$mirror_moduleid = (int) $module->advancedparams->mirror_moduleid;
					$module->reverse = ($module->advancedparams->mirror_module == 2);
					if ($mirror_moduleid)
					{
						if ($mirror_moduleid == $id)
						{
							$empty = new stdClass;
							$module->advancedparams = $parameters->getParams($empty, $xmlfile_assignments);
						}
						else
						{
							if (isset($modules[$mirror_moduleid]))
							{
								if (!isset($modules[$mirror_moduleid]->adv_param))
								{
									$modules[$mirror_moduleid]->adv_param = $this->getAdvancedParams($mirror_moduleid);
									$modules[$mirror_moduleid]->adv_param = $parameters->getParams($modules[$mirror_moduleid]->adv_param, $xmlfile_assignments);
								}
								$module->advancedparams = $modules[$mirror_moduleid]->advancedparams;
							}
							else
							{
								$module->advancedparams = $this->getAdvancedParams($mirror_moduleid);
								$module->advancedparams = $parameters->getParams($module->advancedparams, $xmlfile_assignments);
							}
						}
					}
				}
			}

			if ($module->published)
			{
				if (!$config->show_assignto_homepage)
				{
					$module->advancedparams->assignto_homepage = 0;
				}
				if (!$config->show_assignto_usergrouplevels)
				{
					$module->advancedparams->assignto_usergrouplevels = 0;
				}
				if (!$config->show_assignto_users)
				{
					$module->advancedparams->assignto_users = 0;
				}
				if (!$config->show_assignto_date)
				{
					$module->advancedparams->assignto_date = 0;
					$module->advancedparams->assignto_seasons = 0;
					$module->advancedparams->assignto_months = 0;
					$module->advancedparams->assignto_days = 0;
					$module->advancedparams->assignto_time = 0;
				}
				if (!$config->show_assignto_languages)
				{
					$module->advancedparams->assignto_languages = 0;
				}
				if (!$config->show_assignto_ips)
				{
					$module->advancedparams->assignto_ips = 0;
				}
				if (!$config->show_assignto_geo)
				{
					$module->advancedparams->assignto_geocontinents = 0;
					$module->advancedparams->assignto_geocountries = 0;
					$module->advancedparams->assignto_georegions = 0;
				}
				if (!$config->show_assignto_templates)
				{
					$module->advancedparams->assignto_templates = 0;
				}
				if (!$config->show_assignto_urls)
				{
					$module->advancedparams->assignto_urls = 0;
				}
				if (!$config->show_assignto_os)
				{
					$module->advancedparams->assignto_os = 0;
				}
				if (!$config->show_assignto_browsers)
				{
					$module->advancedparams->assignto_browsers = 0;
				}
				if (!$config->show_assignto_components)
				{
					$module->advancedparams->assignto_components = 0;
				}
				if (!$config->show_assignto_tags)
				{
					$module->advancedparams->show_assignto_tags = 0;
				}
				if (!$config->show_assignto_content)
				{
					$module->advancedparams->assignto_contentpagetypes = 0;
					$module->advancedparams->assignto_cats = 0;
					$module->advancedparams->assignto_articles = 0;
				}
				if (!$config->show_assignto_flexicontent)
				{
					$module->advancedparams->assignto_flexicontentpagetypes = 0;
					$module->advancedparams->assignto_flexicontenttags = 0;
					$module->advancedparams->assignto_flexicontenttypes = 0;
				}
				if (!$config->show_assignto_k2)
				{
					$module->advancedparams->assignto_k2pagetypes = 0;
					$module->advancedparams->assignto_k2cats = 0;
					$module->advancedparams->assignto_k2tags = 0;
					$module->advancedparams->assignto_k2items = 0;
				}
				if (!$config->show_assignto_zoo)
				{
					$module->advancedparams->assignto_zoopagetypes = 0;
					$module->advancedparams->assignto_zoocats = 0;
					$module->advancedparams->assignto_zooitems = 0;
				}
				if (!$config->show_assignto_akeebasubs)
				{
					$module->advancedparams->assignto_akeebasubspagetypes = 0;
					$module->advancedparams->assignto_akeebasubslevels = 0;
				}
				if (!$config->show_assignto_hikashop)
				{
					$module->advancedparams->assignto_hikashoppagetypes = 0;
					$module->advancedparams->assignto_hikashopcats = 0;
					$module->advancedparams->assignto_hikashopproducts = 0;
				}
				if (!$config->show_assignto_mijoshop)
				{
					$module->advancedparams->assignto_mijoshoppagetypes = 0;
					$module->advancedparams->assignto_mijoshopcats = 0;
					$module->advancedparams->assignto_mijoshopproducts = 0;
				}
				if (!$config->show_assignto_redshop)
				{
					$module->advancedparams->assignto_redshoppagetypes = 0;
					$module->advancedparams->assignto_redshopcats = 0;
					$module->advancedparams->assignto_redshopproducts = 0;
				}
				if (!$config->show_assignto_virtuemart)
				{
					$module->advancedparams->assignto_virtuemartpagetypes = 0;
					$module->advancedparams->assignto_virtuemartcats = 0;
					$module->advancedparams->assignto_virtuemartproducts = 0;
				}
				if (!$config->show_assignto_cookieconfirm)
				{
					$module->advancedparams->assignto_cookieconfirm = 0;
				}
				if (!$config->show_assignto_php)
				{
					$module->advancedparams->assignto_php = 0;
				}

				$ass = $assignments->getAssignmentsFromParams($module->advancedparams);
				$pass = $assignments->passAll($ass, $module->advancedparams->match_method);

				if (!$pass)
				{
					$module->published = 0;
				}

				if ($module->reverse)
				{
					$module->published = $module->published ? 0 : 1;
				}
			}

			$modules[$id] = $module;
		}
	}

	private function getConfig()
	{
		static $instance;
		if (!is_object($instance))
		{
			require_once JPATH_PLUGINS . '/system/nnframework/helpers/parameters.php';
			$parameters = NNParameters::getInstance();
			$instance = $parameters->getComponentParams('advancedmodules');
		}

		return $instance;
	}

	private function getAdvancedParams($id)
	{
		$db = JFactory::getDBO();
		$query = $db->getQuery(true)
			->select('a.params')
			->from('#__advancedmodules AS a')
			->where('a.moduleid = ' . (int) $id);
		$db->setQuery($query);

		return $db->loadResult();
	}
}
