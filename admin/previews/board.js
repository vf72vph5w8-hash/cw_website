const BoardMemberPreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    const position = entry.getIn(['data', 'position']) || 'Board Officer';
    const fName = entry.getIn(['data', 'firstName']) || 'First Name';
    const lName = entry.getIn(['data', 'lastName']) || 'Last Name';
    const rawImage = entry.getIn(['data', 'image', 'feature']);
    const resolvedImg = rawImage ? this.props.getAsset(rawImage).toString() : null;

    // Formatting string labels inside the admin preview head space lines
    const displayPosition = position === 'vicepresident' ? 'Vice-President' : position.charAt(0).toUpperCase() + position.slice(1);

    return window.h('div', { 
      style: { padding: '40px 20px', backgroundColor: '#f7fafc', minHeight: '100vh', fontFamily: 'sans-serif' } 
    },
      window.h('article', { 
        style: { maxWidth: '800px', margin: '0 auto', background: '#ffffff', padding: '40px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' } 
      },
        window.h('span', { style: { color: '#3182ce', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em' } }, 
          `${displayPosition}'s Personal Statement`
        ),
        
        window.h('h1', { style: { fontSize: '2.5rem', color: '#1a202c', margin: '10px 0 25px 0', borderBottom: '2px solid #edf2f7', paddingBottom: '15px', fontWeight: '700' } }, 
          `${fName} ${lName}`
        ),

        // Letter 
        window.h('div', { 
          className: 'message-body-content', 
          style: { color: '#2d3748', fontSize: '1.1rem', lineHeight: '1.8' } 
        }, 
          this.props.widgetFor('message')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate("board", BoardMemberPreview);
