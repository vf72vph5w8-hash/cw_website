---
layout: content_page
topnav: sponsors
banner: A special thanks to our sponsors
permalink: /sponsors
sponsors: off
title: A special thanks to our sponsors
intro_text: ""
---


{% for slide in site.data.sponsors.slides %}

{% if slide.link %}
{% assign link=slide.link|split: ","|first %}
<!-- {{ link }} -->
{%endif%}

<h2> <a href="{{link}}">{{slide.name}}</a> </h2>

<div class="row">
<div class="grid_7">
<a href="{{link}}"><img src="{{site.baseurl}}{{slide.img}}" width="70%" style="float: left;"></a>
</div>
<p/>
<div class="grid_5"> {{slide.caption}}<br>
  {% if slide.phone %} Phone: <a href="tel:{{ slide.phone }}">{{slide.phone}}</a> <br>{%endif%}
  {% if slide.email %} Email: <a href="mailto:{{ slide.email }}">{{slide.email}}</a> <br> {%endif%}
  {% if slide.link %} Link: <a href="{{ link }}">{{link}}</a> <br> {%endif%}
</div>
</div>
<p>

{% endfor %}
