var LinksPreview = createClass({
  getInitialState: function() {
    return { categories: null, error: null };
  },
  componentDidMount: function() {
    var self = this;
    this.props.getCollection('useful_links').then(function(entries) {
      var first = entries[0];
      if (first) {
        self.setState({ categories: first.getIn(['data', 'categories']) });
      } else {
        self.setState({ error: 'No entries found' });
      }
    }).catch(function(err) {
      self.setState({ error: err.message });
    });
  },
  render: function() {
    var entry = this.props.entry;
    var title = entry.getIn(['data', 'title']) || 'Useful Links';
    var introText = entry.getIn(['data', 'intro_text']) || '';

    if (this.state.error) return h('pre', null, 'Error: ' + this.state.error);
    if (!this.state.categories) return h('p', null, 'Loading…');

    return h('div', { className: 'wrapper', style: { padding: '20px', fontFamily: 'sans-serif' } },

      h('h1', null, title),

      introText ? h('div', { style: { marginBottom: '20px', lineHeight: '1.6' } },
        this.props.widgetFor('intro_text')
      ) : null,

      // Swapped from custom grid divs to standard layout stream wrapping
      h('div', null,
        this.state.categories.map(function(cat, i) {
          var linksList = cat.links_list || [];

          return h('div', { key: i },
            // Replaced styled card headings with native h3 design markup tags
            h('h3', null, cat.category_title),

            // Changed from flex layouts to standard theme list bullets (ul/li)
            h('ul', null,
              linksList.map(function(item, j) {
                return h('li', { key: j },
                  item.url
                    ? h('a', { href: item.url, target: '_blank' }, item.link_label)
                    : item.link_label,

                  item.phone ? ' ' + item.phone : null
                );
              })
            )
          );
        })
      )
    );
  }
});

CMS.registerPreviewTemplate('links', LinksPreview);
