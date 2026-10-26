// ==========================================
// 1. REUSABLE FLEXBOX COMPONENT FOR POST CARDS
// ==========================================
const PreviewNewsCard = ({ title, date, image, excerpt }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Date Pending';

  return window.h('article', {
    style: {
      display: 'flex',
      flexDirection: 'row',
      gap: '20px',
      padding: '25px',
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
      alignItems: 'flex-start',
      marginBottom: '20px',
      fontFamily: 'sans-serif'
    }
  },
    image ? window.h('div', { style: { flexShrink: 0, width: '220px' } },
      window.h('img', { src: image, style: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px' } })
    ) : null,

    window.h('div', { style: { flexGrow: 1 } },
      window.h('p', { style: { color: '#a0aec0', fontSize: '0.85em', textTransform: 'uppercase', margin: '0 0 5px 0', fontWeight: '600' } },
        `Posted on ${formattedDate}`
      ),
      window.h('h3', { style: { margin: '0 0 12px 0', fontSize: '1.4em', color: '#2d3748', fontWeight: '700' } }, title),
      window.h('div', { style: { color: '#4a5568', lineHeight: '1.6', marginBottom: '15px', fontSize: '0.95em' } }, excerpt),
      window.h('span', { style: { color: '#3182ce', fontWeight: '600', fontSize: '0.9em' } }, 'Read Full Story →')
    )
  );
};

// ==========================================
// 2. INDIVIDUAL ARTICLE POST PREVIEW
// ==========================================
const ArticlePostPreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'New Article Title';
    const date = entry.getIn(['data', 'date']);
    const rawImage = entry.getIn(['data', 'image']);
    const excerpt = entry.getIn(['data', 'excerpt']) || 'Teaser summary text will generate here...';

    const resolvedImage = rawImage ? this.props.getAsset(rawImage).toString() : null;

    return window.h('div', { style: { padding: '20px', backgroundColor: '#f7fafc', minHeight: '100vh' } },
      window.h('h2', { style: { fontSize: '1em', color: '#718096', textTransform: 'uppercase', marginBottom: '15px' } }, 'News Page Preview:'),

      window.h(PreviewNewsCard, { title, date, image: resolvedImage, excerpt }),

      window.h('hr', { style: { border: '0', height: '2px', background: '#cbd5e0', margin: '40px 0' } }),

      window.h('div', {
        className: 'full-article-view',
        style: { maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }
      },
        window.h('h1', { style: { fontSize: '2.2rem', marginBottom: '10px', color: '#1a202c' } }, title),
        window.h('div', { style: { color: '#4a5568', lineHeight: '1.8' } },
          this.props.widgetFor('body')
        )
      )
    );
  }
});

// ==========================================
// 3. MAIN NEWS DASHBOARD PAGE PREVIEW
// ==========================================
const NewsPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedPosts: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;

    if (typeof getCollection === 'function') {
      getCollection('posts')
        .then(entries => {
          if (entries && entries.length > 0) {
            this.setState({ loadedPosts: entries });
          }
        })
        .catch(err => console.error('Failed to load posts:', err));
    }
  },

  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'News';
    const headerImage = entry.getIn(['data', 'header_image']);
    const resolvedHeader = headerImage ? this.props.getAsset(headerImage).toString() : null;

    return window.h('div', { style: { padding: '20px', backgroundColor: '#f7fafc', minHeight: '100vh', fontFamily: 'sans-serif' } },

      resolvedHeader ? window.h('div', { style: { marginBottom: '20px' } },
        window.h('img', { src: resolvedHeader, style: { width: '100%', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' } })
      ) : null,

      window.h('h1', { style: { fontSize: '2.5rem', color: '#1a202c', marginBottom: '15px' } }, title),

      window.h('div', { style: { marginBottom: '30px', color: '#4a5568' } },
        this.props.widgetFor('intro_text')
      ),

      window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '30px 0' } }),

      window.h('h2', { style: { fontSize: '1.6rem', color: '#2d3748', marginBottom: '20px' } }, 'Latest Community Updates'),

      window.h('div', {},
        this.state.loadedPosts.length > 0
          ? this.state.loadedPosts.map((post, idx) => {
              // Entries are Immutable records — use getIn
              const title    = post.getIn(['data', 'title']) || 'Untitled Update';
              const date     = post.getIn(['data', 'date']);
              const rawImage = post.getIn(['data', 'image']);
              const imageStr = typeof rawImage === 'string' ? rawImage
                : (rawImage && rawImage.get ? rawImage.get('url') : null);
              const imgAsset = imageStr ? this.props.getAsset(imageStr).toString() : null;
              const body     = post.getIn(['data', 'body']);
              const excerpt  = post.getIn(['data', 'excerpt']) || (body ? body.substring(0, 150) + '...' : '');

              return window.h(PreviewNewsCard, {
                key: idx,
                title,
                date,
                image: imgAsset,
                excerpt
              });
            })
          : window.h('p', { style: { color: '#718096', fontStyle: 'italic', padding: '15px', background: '#edf2f7', borderRadius: '6px' } },
              'Loading posts…'
            )
      )
    );
  }
});

// ==========================================
// 4. REGISTER BOTH WRAPPERS
// ==========================================
CMS.registerPreviewTemplate("news_page", NewsPagePreview);
CMS.registerPreviewTemplate("posts", ArticlePostPreview);
