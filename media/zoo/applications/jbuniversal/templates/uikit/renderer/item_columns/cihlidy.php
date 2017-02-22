<?php
defined('_JEXEC') or die('Restricted access');
$this->app->jbassets->tablesorter(); // подключение библиотеки для сортировки

if ($vars['count']) : ?>
    <table class="jsTableSorter tablesorter zebra">
        <caption class="uk-text-left uk-margin-large-bottom">
</caption>
        <thead>
        <tr>
            <th>Название</th>
            <th>Поколение</th>
            <th>Размер, см</th>
            <th>Наличие</th>
            <th>Комментарий</th>
        </tr>
        </thead>
        <tbody>
            <?php
            foreach ($vars['objects'] as $object) :
                echo $object;
            endforeach;
            ?>
        </tbody>
    </table>
    <!-- инициализация сортировки -->
    <script type="text/javascript">
        jQuery(function ($) {
            $('.jsTableSorter').tablesorter({});
        });
    </script>
<?php endif;