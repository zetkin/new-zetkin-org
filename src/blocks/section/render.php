<?php

$cn = fn($suffix = '') => "zetkin-section{$suffix}";

?>
<!-- Section Block -->
<div <?php echo get_block_wrapper_attributes(); ?>>
    <div class="<?php echo $cn('__inner-blocks'); ?>">
        <?php echo $content; ?>
    </div>
</div>
<!-- / Section Block -->