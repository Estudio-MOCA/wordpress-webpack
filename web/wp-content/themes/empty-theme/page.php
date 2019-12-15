<?php
if (have_posts()) the_post();
get_header();

the_permalink();
the_title();
the_excerpt();
the_post_thumbnail();
the_content();
the_author();

get_footer();