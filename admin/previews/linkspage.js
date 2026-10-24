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

    var cleanPhone = function(phone) {
      return phone.replace(/[-\s()]/g, '');
    };

    return h('div', { style: { fontFamily: 'system-ui, sans-serif', padding: '20px', maxWidth: '1100px', margin: '0 auto' } },

      h('div', { style: { borderBottom: '1px solid #e2e8f0', paddingBottom: '15px', marginBottom: '25px' } },
        h('h1', { style: { fontSize: '1.8rem', color: '#2d3748', margin: 0 } }, title)
      ),

      introText ? h('div', { style: { marginBottom: '35px', lineHeight: '1.7', color: '#4a5568' } },
        this.props.widgetFor('intro_text')
      ) : null,   

      h('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' } },
        this.state.categories.map(function(cat, i) {
          var linksList = cat.links_list || [];

          return h('div', {
            key: i,
            style: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }
          },
            h('h3', { style: { margin: '0 0 15px 0', fontSize: '1.2rem', color: '#2d3748', fontWeight: '700', borderBottom: '2px solid #3182ce', paddingBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' } }, cat.category_title),

            h('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
              linksList.map(function(item, j) {
                return h('li', {
                  key: j,
                  style: { padding: '10px 0', borderBottom: '1px solid #f7fafc', display: 'flex', flexDirection: 'column', gap: '4px' }
                },
                  h('div', { style: { fontWeight: '600', fontSize: '1.05rem', color: '#2d3748' } },
                    item.url
                      ? h('a', { href: item.url, target: '_blank', style: { color: '#3182ce', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' } }, item.link_label, ' ↗')
                      : item.link_label
                  ),

                  item.phone ? h('div', { style: { fontSize: '0.9rem', color: '#718096', display: 'flex', alignItems: 'center', gap: '4px' } },
                    '📞 ',
                    h('a', { href: 'tel:' + cleanPhone(item.phone), style: { color: '#718096', textDecoration: 'none' } }, item.phone)
                  ) : null
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