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

// register ElementRepeatable class
App::getInstance('zoo')->loader->register('ElementRepeatable', 'elements:repeatable/repeatable.php');

class ElementImagePro extends ElementRepeatable implements iRepeatSubmittable
{
    /**
     * @var JBImageHelper
     */
    protected $_jbimage = null;

    const TEMPLATE_GALLERY = 'gallery';

    /**
     *  Class constructor
     */
    public function __construct()
    {
        parent::__construct();

        $this->_jbimage = $this->app->jbimage;
    }

    /**
     * Checks if the element's value is set
     *
     * @param array $params
     *
     * @return bool
     */
    protected function _hasValue($params = array())
    {
        $file = $this->get('file');

        return !empty($file) && JFile::exists(JPATH_ROOT . '/' . $this->get('file'));
    }

    /**
     * Get elements search data
     *
     * @return null|string
     */
    protected function _getSearchData()
    {
        return $this->get('file');
    }

    /**
     * Renders the repeatable edit form field
     *
     * @param array $params
     *
     * @return null|string
     */
    protected function _edit($params = array())
    {
        $this->app->document->addScript('elements:imagepro/assets/js/edit.js');

        if ($layout = $this->getLayout('edit.php')) {
            return $this->renderLayout($layout);
        }

        return null;
    }

    /**
     * Renders the element
     *
     * @param array $params
     *
     * @return string
     */
    public function render($params = array())
    {
        $this->loadAssets();

        $params = $this->app->data->create($params);
        $layout = $params->get('layout', 'default');
        $ref    = $params->get('link_to_item', 0);

        $settings['zoom']            = $params->get('zoom', 1);
        $settings['layout']          = $layout;
        $settings['link']            = $params->get('link_to_item', 0);
        $settings['lightbox']        = $params->get('lightbox', 1);
        $settings['width']           = $params->get('width', 400);
        $settings['height']          = $params->get('height', 300);
        $settings['zoom_width']      = $params->get('zoom_width', 300);
        $settings['zoom_height']     = $params->get('zoom_height', 300);
        $settings['autoplay']        = $params->get('autoplay', 0);
        $settings['change']          = $params->get('change', 0);
        $settings['interval']        = $params->get('interval', 6000);
        $settings['buttons']         = $params->get('buttons', 0);
        $settings['images']          = $params->get('limit', 3);
        $settings['scroll']          = $params->get('scroll', false);
        $settings['show_title']      = $params->get('show_title', 0);
        $settings['navigation']      = $params->get('show_begin_end', 1);
        $settings['thumb_pos']       = $params->get('thumb_pos', 'bottom');
        $settings['zoom_img_width']  = $params->get('zoom_img_width', 750);
        $settings['zoom_img_height'] = $params->get('zoom_img_height', 750);
        $settings['ref']             = $ref;
        $settings['link']            = $ref == 1 ? $this->app->route->item($this->_item) : null;
        $settings['unique']          = $this->getItem()->alias . '-' . $this->identifier;

        $settings = $this->app->data->create($settings);

        $result = array();

        switch ($layout) {

            case 'default':

                $this->seek(0);
                $result[] = $this->_render($settings);

                break;

            case self::TEMPLATE_GALLERY:

                foreach ($this as $self) {
                    $result[] = $this->_render($settings);
                }

                break;

            default:

                $this->seek(0);
                $result[] = $this->_render($settings);
        }


        if ($wrapper = $this->getLayout('wrapper-' . $layout . '.php')) {
            return $this->renderLayout($wrapper, array(
                'params'   => $settings,
                'elements' => implode($result)
            ));
        }


        return false;
    }

    /**
     * Renders the element in submission
     *
     * @param array $params
     *
     * @return bool|void
     */
    public function _renderSubmission($params = array())
    {
        $this->app->jbsession->set($this->identifier . '||' . $this->key(), null, 'jbimagepro_validate');

        $this->app->document->addScript('elements:imagepro/assets/js/submission.js');
        $this->app->jbassets->addRootUrl();

        // init vars
        $data  = $this->data();
        $image = $this->get('file');
        if (isset($data[$this->key()]['image'])) {
            $image = $data[$this->key()]['image'];
        }

        // is uploaded file
        $image = is_array($image) ? '' : $image;

        // get params
        $trusted_mode = $params->get('trusted_mode');

        // build image select
        $lists = array();
        if ($trusted_mode) {

            $options = array($this->app->html->_('select.option', '', '- ' . JText::_('Select Image') . ' -'));

            if (!empty($image) && $this->_inUploadPath($image)) {
                $options[] = $this->app->html->_('select.option', $image, '- ' . JText::_('No Change') . ' -');
            }

            $img_ext =
                str_replace(',', '|', trim(JComponentHelper::getParams('com_media')->get('image_extensions'), ','));
            foreach ($this->app->path->files('root:' . $this->_getUploadImagePath(), false,
                '/\.(' . $img_ext . ')$/i') as $file) {
                $options[] = $this->app->html->_('select.option', $this->_getUploadImagePath() . '/' . $file, $file);
            }

            $lists['image_select'] =
                $this->app->html->_('select.genericlist', $options, $this->getControlName('image'), 'class="image"',
                    'value', 'text', $image);

        } else {
            if (!empty($image)) {
                $image = $this->app->zoo->resizeImage($this->app->path->path('root:' . $image), 0, 0);
                $image = $this->app->path->relative($image);
            }
        }

        if (!empty($image)) {
            $image = $this->app->path->url('root:' . $image);
        }

        if ($layout = $this->getLayout('submission.php')) {
            return $this->renderLayout($layout,
                compact('lists', 'image', 'trusted_mode')
            );
        }

        return null;
    }

    /**
     * Validates the submitted element
     *
     * @param AppData $value value
     * @param AppData $params submission parameters
     *
     * @return array
     * @throws AppValidatorException
     */
    public function _validateSubmission($value, $params)
    {
        // init vars
        $trusted_mode = $params->get('trusted_mode');

        // get old file value
        $old_file = $this->get('file');

        $file = '';

        // get file from select list
        if ($trusted_mode && $file = $value->get('image')) {

            if (!$this->_inUploadPath($file) && $file != $old_file) {
                throw new AppValidatorException(sprintf('This file is not located in the upload directory.'));
            }

            if (!JFile::exists($file)) {
                throw new AppValidatorException(sprintf('This file does not exist.'));
            }

        } else {

            try {
                // get the uploaded file information
                $userfile = $this->_getUploadedFile();

                // validator hack for element error message after submission controller redirect
                if (
                    (empty($userfile) || empty($userfile['tmp_name']))
                    && ($value->get('filename') || $value->get('image'))
                ) {
                    if (
                    $message =
                        $this->app->jbsession->get($this->identifier . '||' . $this->key(), 'jbimagepro_validate')
                    ) {
                        throw new AppValidatorException($message);
                    }
                }

                // hack hide undefined error after redirect
                if (!empty($userfile)) {
                    $max_upload_size = $this->config->get('max_upload_size', '512') * 1024;
                    $max_upload_size = empty($max_upload_size) ? null : $max_upload_size;

                    $file = $this->app->validator
                        ->create('file', array('mime_type_group' => 'image', 'max_size' => $max_upload_size))
                        ->addMessage('mime_type_group', 'Uploaded file is not an image.')
                        ->clean($userfile);
                }

            } catch (AppValidatorException $e) {

                $this->app->jbsession->set($this->identifier . '||' . $this->key(), $e->getMessage(),
                    'jbimage_validate');

                if ($e->getCode() != UPLOAD_ERR_NO_FILE) {
                    throw $e;
                }

                if (!$trusted_mode && $old_file && $value->get('image')) {
                    $file = $old_file;
                }
            }
        }

        if ($params->get('required') && empty($file)) {
            throw new AppValidatorException('Please select an image to upload.');
        }

        $result = array('file' => $this->_moveUploadedFiles($file));

        if ($trusted_mode) {
            $result['title']  =
                $this->app->validator->create('string', array('required' => false))->clean($value->get('title'));
            $result['link']   = $this->app->validator->create('url', array('required' => false),
                array('required' => 'Please enter an URL.'))->clean($value->get('link'));
            $result['target'] =
                $this->app->validator->create('', array('required' => false))->clean($value->get('target'));
            $result['rel']    =
                $this->app->validator->create('string', array('required' => false))->clean($value->get('rel'));
        }

        $this->next();

        return $result;
    }

    /**
     * Load elements css/js assets
     *
     * @return $this
     */
    public function loadAssets()
    {
        parent::loadAssets();
        if ($this->config->get('fancybox', 1)) {
            $this->app->jbassets->fancybox();
        }
        $this->app->document->addScript('elements:imagepro/assets/js/etalage.js');
        $this->app->document->addStyleSheet('elements:imagepro/assets/css/gallery.css');

        return $this;
    }

    /**
     * Renders the repeatable element
     *
     * @param array $params
     *
     * @return string
     */
    protected function _render($params = array())
    {
        if ($layout = $this->getLayout($params->get('layout') . '.php')) {

            $width  = (float)$params->get('width');
            $height = (float)$params->get('height');

            $original = $this->_jbimage->getImageInfo($this->get('file'));

            if ($params->get('layout') == self::TEMPLATE_GALLERY) {

                $zoomWidth  = (float)$params->get('zoom_img_width');
                $zoomHeight = (float)$params->get('zoom_img_height');

                if ($zoomWidth || $zoomHeight) {
                    $original = $this->_jbimage->resize($this->get('file'), $zoomWidth, $zoomHeight);
                }
            }

            return $this->renderLayout($layout, array(
                'url'      => $this->_jbimage->resize($this->get('file'), $width, $height)->url,
                'original' => $original,
                'title'    => $this->get('title') ? $this->get('title') : $this->getItem()->name,
                'lightbox' => $params->get('lightbox'),
                'width'    => $width,
                'height'   => $height,
                'link'     => $params->get('link'),
                'ref'      => $params->get('ref'),
                'params'   => $params
            ));
        }

        return null;
    }

    /**
     * Get uploaded file for this key
     * @return array|null
     */
    protected function _getUploadedFile()
    {
        if (isset($_FILES['elements'])) {
            $values = $_FILES['elements'];

            $result = array();
            foreach ($values as $key => $value) {
                if (isset($value[$this->identifier][$this->key()]['file'])) {
                    $result[$key] = $value[$this->identifier][$this->key()]['file'];
                }
            }

            if (!empty($result)) {
                // transliteration filename to latin
                $ext      = $this->app->filesystem->getExtension($result['name']);
                $filename = preg_replace('#\.' . $ext . '$#iu', '', $result['name']);

                $result['name'] = $this->app->string->sluggify($filename) . '.' . $ext;

                return $result;
            }
        }

        return null;
    }

    /**
     * Callback before item submission is saved
     *
     * @param array $userfile
     *
     * @return null
     * @throws AppException
     */
    protected function _moveUploadedFiles($userfile)
    {
        if (is_array($userfile) && $userfile['size'] > 0) {
            $ext      = $this->app->filesystem->getExtension($userfile['name']);
            $basePath = JPATH_ROOT . '/' . $this->_getUploadImagePath() . '/';
            $file     = $basePath . $userfile['name'];
            $filename = basename($file, '.' . $ext);

            $i = 1;
            while (JFile::exists($file)) {
                $file = $basePath . $filename . '-' . $i++ . '.' . $ext;
            }

            if (!JFile::upload($userfile['tmp_name'], $file)) {
                throw new AppException('Unable to upload file.');
            }

            $this->app->zoo->putIndexFile(dirname($file));

            return JPath::clean($this->app->path->relative($file));
        }

        return $userfile;
    }

    /**
     * Get upload image path
     * @return string
     */
    protected function _getUploadImagePath()
    {
        $uploadByUser    = (int)$this->config->get('upload_by_user', 0);
        $uploadDirectory = trim(trim($this->config->get('upload_directory', 'images/zoo/uploads/')), '\/');

        if ($uploadByUser) {
            $user = JFactory::getUser();
            $uploadDirectory .= '/user_' . $user->id;
        }

        $uploadDirectory = JPath::clean($uploadDirectory);
        if (!JFolder::exists($uploadDirectory)) {
            mkdir($uploadDirectory, 0777, true);
            @chmod($uploadDirectory, 0777);
        }

        return $uploadDirectory;
    }

    /**
     * Check is in upload path
     *
     * @param $image
     *
     * @return bool
     */
    protected function _inUploadPath($image)
    {
        return JPath::clean($this->_getUploadImagePath()) == JPath::clean(dirname($image));
    }

}