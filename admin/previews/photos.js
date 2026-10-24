const PhotosPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedAlbums: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;
    if (typeof getCollection === 'function') {
      // Fetches individual saved album front-matters asynchronously
      getCollection('photos')
        .then(entries => {
          if (entries && entries.length > 0) {
            this.setState({ loadedAlbums: entries });
          }
        })
        .catch(err => console.error('Failed to load photo albums for preview lookup:', err));
    }
  },

  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'Photo Albums';
    const featuredTarget = entry.getIn(['data', 'featured_album']);

    // Attempt to match the current chosen string value against loaded records
    let matchedFeatured = null;
    if (featuredTarget && this.state.loadedAlbums.length > 0) {
      matchedFeatured = this.state.loadedAlbums.find(album => {
        return album.getIn(['data', 'title']) === featuredTarget;
      });
    }

    return window.h('div', { 
      className: 'photos-page-preview', 
      style: { padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' } 
    },
      window.h('div', { style: { maxWidth: '1200px', margin: '0 auto' } },
        
        // Main Admin Bar Header Banner
        window.h('h1', { style: { fontSize: '2.4rem', color: '#1a202c', marginBottom: '15px' } }, title),
        
        // Native Parsed Markdown Summary Box
        window.h('div', { style: { color: '#4a5568', lineHeight: '1.6', marginBottom: '30px' } }, 
          this.props.widgetFor('intro_text')
        ),

        // Live Mock Render of the Active Featured Card Component
        matchedFeatured ? window.h('div', { 
          style: { background: '#edf2f7', padding: '30px', borderRadius: '8px', marginBottom: '40px', borderLeft: '6px solid #3182ce' } 
        },
          window.h('span', { style: { color: '#3182ce', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' } }, '⭐ Highlighted Gallery'),
          window.h('h2', { style: { margin: '5px 0 10px 0', fontSize: '1.8rem', color: '#1a202c' } }, matchedFeatured.getIn(['data', 'title'])),
          window.h('a', { 
            href: matchedFeatured.getIn(['data', 'external_url']), 
            target: '_blank',
            style: { color: '#3182ce', fontWeight: '600', textDecoration: 'none' } 
          }, 'Open Featured Google Album →')
        ) : (featuredTarget ? window.h('p', { style: { color: '#a0aec0', fontStyle: 'italic' } }, `Resolving relationship hook for: "${featuredTarget}"...`) : null),

        window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '30px 0' } }),
        window.h('h2', { style: { fontSize: '1.5rem', color: '#2d3748', marginBottom: '20px' } }, 'All Shared Albums List Grid View'),

        // Grid Loop Layout Array Preview
        window.h('div', { 
          style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' } 
        },
          this.state.loadedAlbums.length > 0 
            ? this.state.loadedAlbums.map((album, idx) => {
                const aTitle = album.getIn(['data', 'title']) || 'Untitled';
                const aUrl = album.getIn(['data', 'external_url']) || '#';
                return window.h('div', { 
                  key: idx, 
                  style: { border: '1px solid #e2e8f0', padding: '15px', borderRadius: '6px', background: '#fff' } 
                },
                  window.h('h4', { style: { margin: '0 0 10px 0', color: '#2d3748' } }, aTitle),
                  window.h('span', { style: { fontSize: '0.85rem', color: '#718096' } }, 'Google Photos Gallery')
                );
              })
            : window.h('p', { style: { color: '#718096', fontStyle: 'italic' } }, 'Populating collections checklist...')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate("photos_page", PhotosPagePreview);
