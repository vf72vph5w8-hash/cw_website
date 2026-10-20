---
header_image: /assets/uploads/pages/for-sale-sign.png
intro_text: >-
  ## CNA Members: If you have something you want to sell or give away


  Please send us the details and pictures if any to our [Editors](mailto:cornwallisna+4sale@gmail.com) for inclusion here. Let us know if it is free, a curb alert, etc
layout: content_page
permalink: /sales
banner: For sale and free stuff
topnav: sales
title: For sale and free stuff
image:
  feature: for-sale-sign.png
  feature_width: 50%
---

## CNA Members: If you have something you want to sell or give away
Please send us the details and pictures if any to our [Editors](mailto:cornwallisna+4sale@gmail.com) for inclusion here.
Let us know if it is free, a curb alert, etc

<div class="row">
{% for post in site.categories.sales %}
  <!-- post.path is {{post.path}} -->
  {% for p in post %}
  <!-- p is {{p}} -->
  {%endfor %}
  {% unless post.path contains "example" %}
    <div class="grid_9">
    {% include post-grid.html %}
    </div>
  {% endunless %}
{% endfor %}
</div>
