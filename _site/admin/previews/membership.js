// Pure JS file - DO NOT include HTML <script> tags here
const MembershipPagePreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'Become A Member';
    const headerImage = entry.getIn(['data', 'header_image']);
    const googleFormUrl = entry.getIn(['data', 'google_form_url']);
    const pdfFormTitle = entry.getIn(['data', 'pdf_form_title']) || 'Or you can print out this form and send it to us';
    const pdfFormFile = entry.getIn(['data', 'pdf_form_file']);

    // 1. Resolve header image absolute paths exactly like Jekyll logic
    let resolvedHeader = null;
    if (headerImage) {
      const imgStr = typeof headerImage === 'string' ? headerImage : headerImage.toString();
      if (imgStr.includes('https://') || imgStr.includes('/assets/')) {
        resolvedHeader = imgStr;
      } else {
        resolvedHeader = '/images/' + imgStr;
      }
    }

    return window.h('div', { 
      className: 'membership-page-preview', 
      style: { padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' } 
    },
      // Wrapper main block mirroring your layout container
      window.h('div', { style: { maxWidth: '1200px', margin: '0 auto' } },
        
        // Header Section Title
        window.h('section', { id: 'page-header', style: { marginBottom: '20px' } },
          window.h('h1', { style: { fontSize: '2.5rem', color: '#1a202c', margin: '0 0 15px 0' } }, title)
        ),

        // Header Image Render
        resolvedHeader ? window.h('div', { style: { marginBottom: '20px' } },
          window.h('img', { src: resolvedHeader, style: { maxWidth: '100%', height: 'auto', borderRadius: '4px' } })
        ) : null,

        // Render Markdown Intro Text block natively
        window.h('div', { className: 'intro-content', style: { color: '#4a5568', lineHeight: '1.6', marginBottom: '30px' } }, 
          this.props.widgetFor('intro_text')
        ),

        // Google Form Iframe Render
        googleFormUrl ? window.h('div', { style: { position: 'relative', width: '100%', maxWidth: '820px', margin: '20px 0' } },
          window.h('iframe', {
            src: googleFormUrl,
            width: '100%',
            height: '900px',
            frameBorder: '0',
            marginHeight: '0',
            marginWidth: '0'
          }, 'Loading…')
        ) : null,

        // PDF Embedded Iframe & Header
        pdfFormFile ? window.h('div', { className: 'pdf-section', style: { marginTop: '40px' } },
          window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '40px 0' } }),
          window.h('h2', { style: { fontSize: '1.6rem', color: '#2d3748', marginBottom: '20px' } }, pdfFormTitle),
          
          window.h('div', { 
            style: { position: 'relative', width: '100%', height: '800px', marginBottom: '30px', border: '1px solid #cbd5e0', borderRadius: '6px', overflow: 'hidden' } 
          },
            window.h('iframe', {
              src: pdfFormFile,
              width: '100%',
              height: '100%',
              style: { border: 'none' }
            }, 
              'This browser does not support inline PDFs. Please download the document to view it: ',
              window.h('a', { 
                href: pdfFormFile, 
                style: { display: 'inline-block', padding: '8px 16px', background: '#3182ce', color: '#fff', textDecoration: 'none', borderRadius: '4px', marginTop: '10px' } 
              }, 'Download PDF Form')
            )
          )
        ) : null
      )
    );
  }
});

// Register template link mapping targeting your specific collection name
CMS.registerPreviewTemplate("membership_page", MembershipPagePreview);
