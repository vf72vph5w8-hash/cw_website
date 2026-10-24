const AboutPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedBoard: [], loadedDriveDocs: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;
    
    if (typeof getCollection === 'function') {
      // 1. Fetch individual saved board profile files
      getCollection('board')
        .then(entries => { if (entries) this.setState({ loadedBoard: entries }); })
        .catch(err => console.error('CMS Preview failed to read board collection:', err));

      // 2. Fetch the flat data collection linking your Google Drive links
      getCollection('site_documents')
        .then(entries => { if (entries) this.setState({ loadedDriveDocs: entries }); })
        .catch(err => console.error('CMS Preview failed to read drive documents:', err));
    }
  },

  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'About Us';
    const lineupOrder = entry.getIn(['data', 'board_members']);

    // Extract the nested documents array from the site_documents data collection
    let driveList = [];
    if (this.state.loadedDriveDocs.length > 0) {
      const docConfig = this.state.loadedDriveDocs.find(e => e.get('slug') === 'drive_links');
      if (docConfig) {
        const rawDocsList = docConfig.getIn(['data', 'documents']);
        if (rawDocsList) driveList = rawDocsList.toJS ? rawDocsList.toJS() : rawDocsList;
      }
    }

    return window.h('div', { 
      style: { padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#ffffff', minHeight: '100vh' } 
    },
      window.h('div', { style: { maxWidth: '1200px', margin: '0 auto' } },
        
        // --- 1. TITLE & INTRO ---
        window.h('h1', { style: { fontSize: '2.4rem', color: '#1a202c', marginBottom: '15px' } }, title),
        window.h('div', { style: { color: '#4a5568', lineHeight: '1.6', marginBottom: '30px' } }, 
          this.props.widgetFor('intro_text')
        ),

        window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '30px 0' } }),

        // --- 2. BOARD MEMBERS GRID ---
        window.h('h2', { style: { fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px', fontWeight: '700' } }, 'Board Members & Officers'),
        
        window.h('div', { 
          style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' } 
        },
          lineupOrder && this.state.loadedBoard.length > 0 ? lineupOrder.map((item, idx) => {
            const memberSlug = item.get('member');
            const matchedFile = this.state.loadedBoard.find(b => b.getIn(['data', 'position']) === memberSlug);
            
            if (!matchedFile) return null;

            const position = matchedFile.getIn(['data', 'position']) || '';
            const fName = matchedFile.getIn(['data', 'firstName']) || '';
            const lName = matchedFile.getIn(['data', 'lastName']) || '';
            const address = matchedFile.getIn(['data', 'address']);
            const phone = matchedFile.getIn(['data', 'phone']);
            const email = matchedFile.getIn(['data', 'email']);
            const rawImage = matchedFile.getIn(['data', 'image', 'feature']);
            const resolvedImg = rawImage ? this.props.getAsset(rawImage).toString() : null;

            // Format positions for the UI label view text string
            const displayPosition = position === 'vicepresident' ? 'Vice-President' : position.charAt(0).toUpperCase() + position.slice(1);

            return window.h('div', { 
              key: idx, 
              style: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '25px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' } 
            },
              window.h('div', {},
                window.h('span', { style: { color: '#3182ce', fontWeight: '700', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.05em' } }, displayPosition),
                
                // Containment Scaled Image Frame
                resolvedImg 
                  ? window.h('div', { style: { margin: '10px 0 15px 0', borderRadius: '6px', overflow: 'hidden', height: '220px', background: '#f7fafc', border: '1px solid #edf2f7' } },
                      window.h('img', { src: resolvedImg, style: { width: '100%', height: '100%', objectFit: 'contain' } })
                    )
                  : window.h('div', { style: { margin: '10px 0 15px 0', borderRadius: '6px', height: '220px', background: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0aec0' } }, 
                      window.h('svg', { width: '48', height: '48', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' }, 
                        window.h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
                        window.h('circle', { cx: '12', cy: '7', r: '4' })
                      )
                    ),

                window.h('h3', { style: { margin: '0 0 15px 0', fontSize: '1.35rem', color: '#2d3748', fontWeight: '700' } }, `${fName} ${lName}`),
                
                // Profile Contact Metadata List
                window.h('div', { style: { fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.8', marginBottom: '20px' } },
                  address ? window.h('div', {}, `📍 ${address}`) : null,
                  phone ? window.h('div', {}, `📞 ${phone}`) : null,
                  email ? window.h('div', {}, `✉️ Email ${fName}`) : null
                )
              ),
              window.h('span', { style: { display: 'block', textAlign: 'center', padding: '10px 15px', background: '#3182ce', color: '#ffffff', borderRadius: '5px', fontSize: '0.9rem', fontWeight: '600' } }, `Read ${fName}'s Message →`)
            );
          }) : window.h('p', { style: { color: '#a0aec0', fontStyle: 'italic' } }, 'Loading sorted card list lineup details...')
        ),

        window.h('hr', { style: { border: '0', height: '1px', background: '#e2e8f0', margin: '40px 0' } }),

        // --- 3. GOOGLE DRIVE DOCUMENTS FOLDER GRID ---
        window.h('h2', { style: { fontSize: '1.8rem', color: '#1a202c', marginBottom: '20px', fontWeight: '700' } }, 'Documents & Records Archive'),
        window.h('div', { 
          style: { background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' } 
        },
          driveList.length > 0 ? window.h('ul', { style: { listStyle: 'none', padding: 0, margin: 0 } },
            driveList.map((doc, idx) => {
              return window.h('li', { 
                key: idx,
                style: { padding: '15px', borderBottom: '1px solid #edf2f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' } 
              },
                window.h('div', { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
                  // Sharp Google Drive Brand SVG Icon Vector Graphic
                  window.h('div', { style: { width: '24px', height: '24px', display: 'flex' } },
                    window.h('svg', { viewBox: '0 0 24 24', width: '100%', height: '100%' },
                      window.h('path', { d: 'M8.81 2h6.38l6.73 11.56h-6.38z', fill: '#FFC107' }),
                      window.h('path', { d: 'M15.44 13.56H2.08L5.43 20h13.36z', fill: '#4CAF50' }),
                      window.h('path', { d: 'M1.92 13.25L5.27 2 12 13.56H5.43z', fill: '#2196F3' })
                    )
                  ),
                  window.h('h4', { style: { margin: '0', fontSize: '1.15rem', color: '#2d3748', fontWeight: '600' } }, doc.title)
                ),
                window.h('span', { style: { display: 'inline-block', padding: '8px 16px', background: '#3182ce', color: '#ffffff', borderRadius: '5px', fontSize: '0.85rem', fontWeight: '600' } }, 'Open Drive Folder ↗')
              );
            })
          ) : window.h('p', { style: { color: '#a0aec0', padding: '20px', textAlign: 'center' } }, 'No shared folders linked in _data/documents.yml yet.')
        )
      )
    );
  }
});

CMS.registerPreviewTemplate("aboutus", AboutPagePreview);
