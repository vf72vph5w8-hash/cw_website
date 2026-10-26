const AboutPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedBoard: [], loadedDriveDocs: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;
    if (typeof getCollection === 'function') {
      getCollection('board')
        .then(entries => { if (entries) this.setState({ loadedBoard: entries }); })
        .catch(err => console.error('Failed to read board collection:', err));

      getCollection('site_documents')
        .then(entries => { if (entries) this.setState({ loadedDriveDocs: entries }); })
        .catch(err => console.error('Failed to read drive documents:', err));
    }
  },

  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'About Us';
    const lineupOrder = entry.getIn(['data', 'board_members']);

    // Extract documents from site_documents collection
    let driveList = [];
    if (this.state.loadedDriveDocs.length > 0) {
      const docConfig = this.state.loadedDriveDocs.find(e => e.get('slug') === 'drive_links');
      if (docConfig) {
        const raw = docConfig.getIn(['data', 'documents']);
        if (raw) driveList = raw.toJS ? raw.toJS() : raw;
      }
    }

    const h = window.h;

    // --- Page Header ---
    const pageHeader = h('section', { id: 'page-header', className: 'clearfix' },
      h('div', { className: 'wrapper' },
        h('h1', {}, title)
      )
    );

    // --- Main Content ---
    const main = h('main', {},
      h('div', { className: 'wrapper', id: 'main' },
        h('section', { id: 'content' },

          // Intro
          entry.getIn(['data', 'intro_text'])
            ? h('div', { className: 'row' },
                h('div', { className: 'intro-block', style: { marginBottom: '35px', lineHeight: '1.7', color: '#4a5568' } },
                  this.props.widgetFor('intro_text')
                )
              )
            : null,

          // --- Board Section ---
          lineupOrder && this.state.loadedBoard.length > 0
            ? h('div', {},
                h('h2', { id: 'board' }, 'The Board'),
                h('div', {},
                  lineupOrder.map((item, idx) => {
                    const memberSlug = item.get('member');
                    const member = this.state.loadedBoard.find(b => b.getIn(['data', 'position']) === memberSlug);
                    if (!member) return null;

                    const position = member.getIn(['data', 'position']) || '';
                    const displayName = position === 'vicepresident' ? 'Vice-President' : position.charAt(0).toUpperCase() + position.slice(1);
                    const url = member.getIn(['data', 'url']) || `#${position}`;
                    const fName = member.getIn(['data', 'firstName']) || '';
                    const lName = member.getIn(['data', 'lastName']) || '';
                    const address = member.getIn(['data', 'address']);
                    const phone = member.getIn(['data', 'phone']);
                    const email = member.getIn(['data', 'email']);
                    const rawImage = member.getIn(['data', 'image', 'feature']);
                    const resolvedImg = rawImage ? this.props.getAsset(rawImage).toString() : null;

                    return h('div', { key: idx, className: 'row' },
                      h('h3', {},
                        h('a', { href: url }, `${displayName}'s Message`)
                      ),
                      h('div', { className: 'grid_6' },
                        h('a', { href: url },
                          resolvedImg
                            ? h('img', { src: resolvedImg, alt: 'Member photo', style: { width: '30%' } })
                            : null,
                          h('img', { src: '/images/ThoughtBubble-Messages.jpg', align: 'top', width: '20%', alt: 'Click for Messages' })
                        )
                      ),
                      h('div', { className: 'grid_6' },
                        h('p', {},
                          `${fName.toUpperCase()} ${lName.toUpperCase()}`,
                          h('br', {}),
                          address ? `${address}` : null,
                          h('br', {}),
                          phone ? h('a', { href: `tel:+1${phone.replace(/-/g, '')}` }, phone) : null,
                          h('br', {}),
                          email ? h('a', { href: `mailto:${email}` }, `Email ${fName}`) : null
                        )
                      )
                    );
                  })
                )
              )
            : null,

          // --- Documents Section ---
          h('section', {},
            h('h2', { id: 'documents' }, 'Documents'),
            h('div', { className: 'row' },
              h('div', { className: 'grid_12' },
                driveList.length > 0
                  ? h('ul', {},
                      driveList.map((doc, idx) =>
                        h('li', { key: idx },
                          h('a', { href: doc.url || '#' }, doc.title)
                        )
                      )
                    )
                  : null
              )
            )
          ),


        )
      )
    );

    return h('div', {}, pageHeader, main);
  }
});

CMS.registerPreviewTemplate('aboutus', AboutPagePreview);
