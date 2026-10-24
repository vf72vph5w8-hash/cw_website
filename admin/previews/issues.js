const IssuesPreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    
    // 1. Pull data directly from the active DecapCMS form state fields
    const title = entry.getIn(['data', 'title']) || 'New Issue/Report';
    const sponsors = entry.getIn(['data', 'sponsors']) || 'bottom';
    const googleFormUrl = entry.getIn(['data', 'google_form_url']);
    
    // Handle image rendering path logic exactly like the Jekyll template
    const rawImage = entry.getIn(['data', 'image', 'feature']);
    let resolvedImg = null;
    if (rawImage) {
      const imgStr = rawImage.toString();
      resolvedImg = imgStr.includes('https://') ? imgStr : '/images/' + imgStr;
    }

    return window.h('div', { 
      className: 'issues-page-wrapper',
      style: { fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh', padding: '20px' } 
    },
      // --- Page Banner Header Title ---
      window.h('section', { id: 'page-header', style: { marginBottom: '20px' } },
        window.h('div', { className: 'wrapper' },
          window.h('h1', { style: { fontSize: '2.2rem', color: '#1a202c', margin: '0 0 15px 0', fontWeight: '700' } }, title)
        )
      ),

      // --- Main Wrapper Layout Grid Container ---
      window.h('div', { className: 'wrapper', id: 'main', style: { maxWidth: '1200px', margin: '0 auto' } },
        window.h('section', { id: 'content' },

          // Feature Banner Image Render (If supplied)
          resolvedImg ? window.h('div', { style: { marginBottom: '20px', borderRadius: '6px', overflow: 'hidden' } },
            window.h('img', { src: resolvedImg, style: { width: '100%', maxHeight: '300px', objectFit: 'cover' } })
          ) : null,

          // CONDITION A: SPONSORS BOTTOM LAYOUT
          sponsors === 'bottom' ? window.h('div', { className: 'row' },
            
            // Native Markdown Parsed Intro Text Block
            window.h('div', { style: { color: '#4a5568', lineHeight: '1.7', marginBottom: '35px' } }, 
              this.props.widgetFor('intro_text')
            ),

            // Google Form Iframe Render
            googleFormUrl ? window.h('div', { style: { position: 'relative', width: '100%', maxWidth: '820px', margin: '20px auto' } },
              window.h('iframe', {
                src: googleFormUrl,
                width: '100%',
                height: '900px',
                frameBorder: '0',
                marginHeight: '0',
                marginWidth: '0'
              }, 'Loading…')
            ) : null
          ) : null 

        )
      )
    );
  }
});

// Register template linkage matching your Decap CMS configuration collection label slug
CMS.registerPreviewTemplate("issues", IssuesPreview);
