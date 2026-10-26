var UsefulLinksPreview = createClass({
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
    if (this.state.error) return h('pre', null, 'Error: ' + this.state.error);
    if (!this.state.categories) return h('p', null, 'Loading…');

    return h('div', { className: 'wrapper', style: { padding: '20px', fontFamily: 'sans-serif' } },

      h('h1', null, 'Useful Links'),

      // Stripped card layout grids and returned to raw document stream elements
      h('div', null,
        this.state.categories.map(function(cat, i) {
          var linksList = cat.links_list || [];

          return h('div', { key: i },
            // Outputs standard unstyled h3 elements matching Jekyll rules
            h('h3', null, cat.category_title),

            // Outputs raw ul and li lists using native markdown text layouts
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

CMS.registerPreviewTemplate('links_manager', UsefulLinksPreview);
