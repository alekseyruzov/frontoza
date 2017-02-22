<?php
/**
 * JBZoo App is universal Joomla CCK, application for YooTheme Zoo component
 * @package     jbzoo
 * @version     2.x Pro
 * @author      JBZoo App http://jbzoo.com
 * @copyright   Copyright (C) JBZoo.com,  All rights reserved.
 * @license     http://jbzoo.com/license-pro.php JBZoo Licence
 * @coder       Denis Smetannikov <denis@jbzoo.com>
 */

// no direct access
defined('_JEXEC') or die('Restricted access');


require_once JPATH_ADMINISTRATOR . '/components/com_zoo/config.php';
require_once JPATH_BASE . '/media/zoo/applications/jbuniversal/framework/jbzoo.php';
require_once JPATH_BASE . '/media/zoo/applications/jbuniversal/framework/classes/jbmodulehelper.php'; // TODO move to bootstrap


/**
 * Class JBModuleHelperFilter
 */
class JBModuleHelperFilter extends JBModuleHelper
{
    /**
     * @param JRegistry $params
     * @param stdClass  $module
     */
    public function __construct($params, $module)
    {
        parent::__construct($params, $module);

        // prepeare helper
        $this->app->jbfilter->set($this->getType(), $this->getAppId()); // TODO kill me
    }

    /**
     * Load filters important asstes
     */
    protected function _loadAssets()
    {
        parent::_loadAssets();

        $this->_jbassets->js('mod_jbzoo_search:assets/js/filter.js');

        $this->_jbassets->less('mod_jbzoo_search:assets/less/filter.less');
        $this->_jbassets->less('mod_jbzoo_search:assets/less/filter-' . $this->getItemLayout() . '.less');
    }

    /**
     *  init filter widget
     */
    protected function _initWidget()
    {
        $this->_jbassets->widget('#' . $this->getModuleId(), 'JBZoo.Filter', array(
            'autosubmit' => (int)$this->_params->get('autosubmit', 0)
        ));
    }

    /**
     * Get pages
     * @return mixed
     */
    public function renderPages()
    {
        $value = $this->_jbrequest->get('limit', $this->_params->get('pages', 20));

        if ((int)$this->_params->get('pages_show', 1)) {
            $values = array('5', '10', '15', '20', '25', '30', '50', '100', 'all');

            $options = array();
            foreach ($values as $option) {
                $options[$option] = 'JBZOO_NUMBERS_' . $option;
            }

            $html = $this->_jbhtml->select($options, 'limit', null, $value, 'jbfilter-id-limit', true);
        } else {
            $html = $this->_jbhtml->hidden('limit', $value);
        }

        return $html;
    }

    /**
     * Get logic
     * @return string|null
     */
    public function renderLogic()
    {
        $value = $this->_jbrequest->get('logic', $this->_params->get('logic', 'and'));

        if ((int)$this->_params->get('logic_show', 1)) {
            $options = array('and' => 'JBZOO_AND', 'or' => 'JBZOO_OR');
            $html    = $this->_jbhtml->radio($options, 'logic', null, $value, 'jbfilter-id-logic', true);
        } else {
            $html = $this->_jbhtml->hidden('logic', $value);
        }

        return $html;
    }

    /**
     * Get ordering
     * @return mixed
     */
    public function getOrderings()
    {
        $appId = $this->getAppId();
        $type  = $this->getType();

        $default = $this->app->data->create($this->_params->get('order_default', array()));
        $request = $this->_jbrequest->getArray('order');
        $values  = $this->app->data->create((!empty($request)) ? $request : $default);

        $orderList = $this->getOrderList();

        $html = array();
        if ((int)$this->_params->get('order_show', 1) && !empty($orderList)) {

            if (empty($request)) {
                $values->set('reverse', (int)($default->order == 'desc'));
            }

            $orderMode = $this->_params->get('order_mode');

            $options = array();
            foreach ($orderList as $fieldId) {
                $options[$fieldId] = $this->app->jborder->getNameById($fieldId, $type, $appId);
            }

            $html[] = $this->_jbhtml->select($options, 'order[field]', array(), $values->get('field'), 'jbfilter-id-order', true);
            $html[] = $this->_jbhtml->checkbox(array('1' => JText::_('JBZOO_ORDER_REVERSE')), 'order[reverse]', '', $values->get('reverse'));
            $html[] = $this->_jbhtml->hidden('order[mode]', $orderMode);

        } else {
            foreach ($default as $key => $value) {
                $html[] = $this->_jbhtml->hidden('order[' . $key . ']', $value);
            }
        }

        return implode(PHP_EOL, $html);
    }

    /**
     * @return array
     */
    public function getOrderList()
    {
        return $this->_params->get('order_list', array());
    }

    /**
     * @param array $fields
     * @return mixed
     */
    public function renderHidden($fields)
    {
        return $this->app->jbhtml->hiddens($fields);
    }

}
