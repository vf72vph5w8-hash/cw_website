// ==========================================
// 1. REUSABLE FLEXBOX COMPONENT FOR SALE CARDS
// ==========================================
const PreviewSaleCard = ({ title, date, expirationDate, image, description }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'Date Pending';

  const formattedExpiry = expirationDate
    ? new Date(expirationDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

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
      window.h('img', { src: image, style: { width: '100%', borderRadius: '6px' } })
    ) : null,

    window.h('div', { style: { flexGrow: 1 } },
      window.h('p', { style: { color: '#a0aec0', fontSize: '0.85em', textTransform: 'uppercase', margin: '0 0 5px 0', fontWeight: '600' } },
        `Posted ${formattedDate} ${formattedExpiry ? `· Expires \${formattedExpiry}` : ''}`
      ),
      window.h('h3', { style: { margin: '0 0 12px 0', fontSize: '1.4em', color: '#2d3748', fontWeight: '700' } }, title),
      window.h('div', { style: { color: '#4a5568', lineHeight: '1.6', marginBottom: '15px', fontSize: '0.95em' } }, description),
      window.h('span', { style: { color: '#3182ce', fontWeight: '600', fontSize: '0.9em' } }, 'View Details →')
    )
  );
};

// ==========================================
// 2. INDIVIDUAL SALE LISTING POST PREVIEW
// ==========================================
const SaleListingPreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'New Sale Listing';
    const date = entry.getIn(['data', 'date']);
    const expirationDate = entry.getIn(['data', 'expiration_date']);
    const rawImage = entry.getIn(['data', 'thumbnail']);
    const description = entry.getIn(['data', 'description']) || 'Item details will appear here...';

    const resolvedImage = rawImage ? this.props.getAsset(rawImage).toString() : null;

    return window.h('div', { style: { padding: '20px', backgroundColor: '#f7fafc', minHeight: '100vh' } },
      window.h('h2', { style: { fontSize: '1em', color: '#718096', textTransform: 'uppercase', marginBottom: '15px' } }, 'Sale Listing Card Preview:'),

      window.h(PreviewSaleCard, { title, date, expirationDate, image: resolvedImage, description }),

      window.h('hr', { style: { border: '0', height: '2px', background: '#cbd5e0', margin: '40px 0' } }),

      window.h('div', {
        className: 'full-listing-view',
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
// 3. MAIN SALES DASHBOARD PAGE PREVIEW
// ==========================================
const SalesPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedListings: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;

    if (typeof getCollection === 'function') {
      // Assuming your DecapCMS collection name for items is 'sales'
      getCollection('sales')
        .then(entries => {
          if (entries && entries.length > 0) {
            this.setState({ loadedListings: entries });
          }
        })
        .catch(err => console.error('Failed to load sale listings:', err));
    }
  },

  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'Sales & Classifieds';
    const headerImage = entry.getIn(['data', 'header_image']);
    const resolvedHeader = headerImage ? this.props.getAsset(headerImage).toString() : null;

    // Filter active listings matching the Jekyll Unix timestamp expiration logic
    const currentTime = Math.floor(Date.now() / 1000);
    const activeListings = this.state.loadedListings.filter(listing => {
      const expiryStr = listing.getIn(['data', 'expiration_date']);
      if (!expiryStr) return true; // Keep if no expiry date is set
      const expiryTime = Math.floor(new Date(expiryStr).getTime() / 1000);
      return expiryTime > currentTime;
    });

    return window.h('div', { style: { padding: '20px', backgroundColor: '#f7fafc', minHeight: '100vh', fontFamily: 'sans-serif' } },

      resolvedHeader ? window.h('div', { style: { marginBottom: '20px' } },
        window.h('img', { src: resolvedHeader, style: { width: '302px', maxHeight: '250px', objectFit: 'cover', borderRadius: '8px' } })
      ) : null,

      window.h('h1', { style: { fontSize: '2.5rem', color: '#1a202c', marginBottom: '15px' } }, title),

      window.h('div', { style: { marginBottom: '30px', color: '#4a5568' } },
        this.props.widgetFor('intro_text')
      ),

      window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '30px 0' } }),

      window.h('h2', { style: { fontSize: '1.6rem', color: '#2d3748', marginBottom: '20px' } }, 'Active Listings'),

      window.h('div', {},
        activeListings.length > 0
          ? activeListings.map((listing, idx) => {
              const title = listing.getIn(['data', 'title']) || 'Untitled Listing';
              const date = listing.getIn(['data', 'date']);
              const expirationDate = listing.getIn(['data', 'expiration_date']);
              const rawImage = listing.getIn(['data', 'thumbnail']);
              const imageStr = typeof rawImage === 'string' ? rawImage
                : (rawImage && rawImage.get ? rawImage.get('url') : null);
              const imgAsset = imageStr ? this.props.getAsset(imageStr).toString() : null;   
              const description = listing.getIn(['data', 'description']) || '';

              return window.h(PreviewSaleCard, {
                key: idx,
                title,
                date,
                expirationDate,
                image: imgAsset,
                description
              });
            })
          : window.h('p', { style: { color: '#718096', fontStyle: 'italic', padding: '15px', background: '#edf2f7', borderRadius: '6px' } },
              'No active sale listings found.'
            )
      )
    );
  }
});   

// ==========================================
// 4. REGISTER BOTH WRAPPERS
// ==========================================
CMS.registerPreviewTemplate("sales_page", SalesPagePreview);
CMS.registerPreviewTemplate("sales_listing", SaleListingPreview);
