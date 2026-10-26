var HomePreview = createClass({
  getInitialState: function() {
    return { announcements: [] };
  },
  componentDidMount: function() {
    var self = this;
    var getCollection = this.props.getCollection;
    if (typeof getCollection === 'function') {
      getCollection('announcements')
        .then(function(entries) {
          if (entries) self.setState({ announcements: entries });
        })
        .catch(function(err) {
          console.error('Failed:', err);
        });
    }
  },
  render: function() {
    var entry = this.props.entry; // Immutable Map
    var title = entry.getIn(['data', 'title']) || '';
    var split1 = entry.getIn(['data', 'split_section_1']); // Immutable Map
    var split2 = entry.getIn(['data', 'split_section_2']); // Immutable Map
    var midAnnouncements = entry.getIn(['data', 'mid_page_announcements']); // Immutable List of strings
    var bottomAnnouncements = entry.getIn(['data', 'bottom_row_announcements']); // Immutable List of strings
    var announcements = this.state.announcements; // array of Immutable Maps from getCollection

    // Convert Immutable Lists to plain arrays once
    var midSlugs = midAnnouncements ? midAnnouncements.toArray() : [];
    console.log('midSlugs:', midSlugs);
    var bottomSlugs = bottomAnnouncements ? bottomAnnouncements.toArray() : [];

    // slug is top-level on the entry, NOT inside data
    function findAnnouncement(slug) {
      return announcements.find(function(a) {
        return a.get('slug') === slug;
      }) || null;
    }

    function renderAnnouncements(slugs) {
      if (!slugs || slugs.length === 0 || announcements.length === 0) return '';
      return slugs.map(function(slug) {
        var ann = findAnnouncement(slug);
        if (!ann) return '<div class="announcement"><h2>[' + slug + ' not found]</h2></div>';
        var d = ann.get('data') || {}; // plain object
        var annTitle = d.title || '';
        var annBody = d.body ? marked.parse(d.body) : '';
        var annImage = d.image || '';
        var html = '<div class="announcement"><h2>' + annTitle + '</h2>';
        if (annImage) html += '<img src="' + annImage + '">';
        if (annBody) html += annBody;
        html += '</div>';
        return html;
      }).join('');
    }

    var slides = '';
    if (split2 && split2.get('slideshow_images')) {
      var images = split2.get('slideshow_images'); // Immutable List of strings
      slides = images.toArray().map(function(src) {
        return '<li><img src="' + src + '" alt="Slideshow Image"></li>';
      }).join('');
    }

    var midAnnHtml = renderAnnouncements(midSlugs);
    var bottomAnnHtml = renderAnnouncements(bottomSlugs);

    var html = ''
      + '<section id="hero" class="clearfix">'
      + '  <div class="wrapper">'
      + '    <div class="row">'
      + '      <h1 style="text-align:center"><img src="/images/CornwallisLetterhead.png" class="center" alt="' + title + '"></h1>'
      + '    </div>'
      + (split1
        ? '    <div class="row">'
        + '      <div class="grid_6">' + split1.get('content') + '</div>'
        + '      <div class="grid_6">'
        + (split1.get('image') ? '<img src="' + split1.get('image') + '">' : '')
        + '      </div>'
        + '    </div>'
        : '')
      + (split2
        ? '    <div class="row">'
        + '      <div class="grid_6"><div class="flexslider"><ul class="slides">' + slides + '</ul></div></div>'
        + '      <div class="grid_6">' + split2.get('content') + '</div>'
        + '    </div>'
        : '')
      + '  </div>'
      + '</section>'
      + '<div id="main" class="wrapper">'
      + '  <section id="content">'
      + (midAnnHtml ? '    <div class="row"><div class="grid_12">' + midAnnHtml + '</div></div>' : '')
      + (bottomAnnHtml ? '    <div class="row">' + bottomAnnHtml + '</div></div>' : '')
      + '  </section>'
      + '</div>';

    return h('div', { dangerouslySetInnerHTML: { __html: html } });
  }
});

CMS.registerPreviewTemplate('home', HomePreview);
