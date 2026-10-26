---
layout: content_page
---

{% if false %}

WARNING: Many of the highlighted links directly on this page will not work if you are viewing this page directly in Github. Instead,
you can see the complete page [here](https://cornwallisna.org/README/index.html) which will be fully expanded by Jekyll and the links are in working order.

{% endif %}

# Cornwallis Neighborhood Association (CNA) Website

This website uses Jekyll and the Responsive Starter Template to provide a website for the Cornwallis Neighborhood Community.  The goal of the website is to provide a live newsletter such that information can be shared more quickly and at less cost than our quarterly newsletter.

Content is managed through [Decap CMS](https://decapcms.org) (formerly Netlify CMS), which provides a web-based admin interface at `/admin/` for authorized board members.

# Features

* Simple home page for important news
* Running news entries for use by board members
* Showcase some community pictures via google albums
* Membership signup and renewal instructions
* For sale/curb alert items to post
* Association by-laws and document archive
* Support for sponsors
* Website feedback and issue tickets
* [Statistics page]({{site.baseurl}}/stats.html)

# How it works

Authorized members of the CNA team log in to the [Decap CMS admin]({{site.baseurl}}/admin/) using their own Github account via OAuth. Once logged in, they will be able to edit content using the Decap CMS admin pages.  Changes are submitted as pull requests to this GitHub repository as soon as they're submitted. All of files and configuration related to Decap CMS can be found in the `/admin/` directory. The site can continue working completely independently of Decap CMS. Some of the fields added into Decap CMS are not being used at this time. They can be added to the templates in the future if desired, but they were left out for the current template versions of the site. Filling them in will not cause any harm, but they will not be displayed if not included in the templates.

## Editing pages

Most pages are edited directly through the CMS admin interface.

## Jekyll and frontmatter

[Jekyll](https://jekyll.com) is the static site generator. This site is a combination of Jekyll and the [Simple Responsive Template](http://www.prowebdesign.ro/simple-responsive-template/conditions-use.html) which provides the web site layout.

Frontmatter is a [Jekyll](https://jekyllrb.com/docs/front-matter/) term that refers to configuration information at the top of a Jekyll page. In most cases, the CMS handles frontmatter automatically — you set fields in the admin form and the CMS writes the YAML for you.

### Supported frontmatter for this site

Frontmatter will vary from page-to-page and collection-to-collection. Decap CMS will generate the required frontmatter for all pages within the CMS.

### Images

Images are typically stored in the `images/` folder. The CMS handles image uploads — select an image in the admin and it will be added to the repository automatically.

Images can also be external URLs (e.g., Google Photos links). The `image.feature` field accepts either a filename (resolved to `/images/filename`) or a full `https://` URL.

## Adding a new news or for-sale entry

New entries are created through the CMS admin under the appropriate collection. Each entry is a Jekyll article stored in `_posts/` with a filename like `YYYY-MM-DD-slug.md`.

An example article frontmatter:

<pre>
---
layout: article
title: "Garage sales!!!!!"
categories: articles
modified: 2021-01-26T11:30:41-04:00
contact: mailto:cornwallisna+example@gmail.com
tags: general,garagesale
sponsors: "bottom"
image:
  feature: garage-sale.png
  teaser: https://bit.ly/3tiPl6k
---

## This is a header

This is content, we are having a garage sale ...
</pre>

The `categories` field has two values: *articles* for news and *sales* for free/for-sale items. The `contact` field adds a contact link to the bottom of the message.

## Advertising

The rotating sponsor banner is managed through the **Sponsors** collection in the CMS admin. Each entry has:

* **img** – Path to the advertiser image (usually in `images/ads/`)
* **caption** – Text caption (supports HTML links)
* **link** – URL, `mailto:`, or `tel:` link for the click-through
* **name** – Internal identifier

The order of entries in the collection determines display order.

## Board members & documents

The About page pulls from two CMS collections:

* **Board** – One entry per member (position, first/last name, address, phone, email, photo). The `aboutus` page's `board_members` field controls display order.
* **Site Documents** – A single entry (`slug: drive_links`) containing a list of Google Drive folder links shown in the Documents section.

# Email forwarding

Emails to council members are forwarded to their respective accounts when email is received by cornwallisna@gmail.com. The currently supported redirects are:

* cornwallisna+president@gmail.com
* cornwallisna+vicepresident@gmail.com
* cornwallisna+treasurer@gmail.com
* cornwallisna+secretary@gmail.com

Additional email tags used within the site include:

* cornwallisna+news@gmail.com – Send CNA news or life event information to be published
* cornwallisna+4sale@gmail.com – Send CNA requests to post local sale items and curb alerts (free stuff)

# Analytics

The site is monitored by Google Analytics. You will need the association account credentials to access the [GA site](https://analytics.google.com).

# Original README from Simple Responsive Starter Template

Simple is a responsive starter web site template. It is intended to be basic and bare-bone, with minimum styling and options included. Still, it has features clients usually would ask for: menu with drop-downs, slider, grid layout.

Simple is mainly for web designers (beginner to intermediate level). But it is so simple (pun intended:) that any person with very little knowledge of HTML can modify and use it.

To build a website with Simple, download it and add your own content and pages. Or, if you want a different design, you can tweak the CSS. In either case, you will have a device-agnostic website that works and looks great on smart phones, tablets, laptops, and desktops.

Simple is compatible with FireFox, Google Chrome, Opera, Opera Mini, Safari, IE9, 10. It is also compatible with IE8, but they will see the mobile layout.

Simple is a FREE software, released without any warranty under Common Public Attribution License. Simple can be used in personal or commercial projects for free provided you keep the attribution statement intact. Read more about terms of use [here](http://www.prowebdesign.ro/simple-responsive-template/conditions-use.html).

If you want to use Simple without attribution link, buy us a coffee and get a waiver: http://www.prowebdesign.ro/simple-responsive-template/conditions-use.html
