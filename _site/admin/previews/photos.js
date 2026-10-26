const PhotosPagePreview = window.createClass({
  getInitialState: function() {
    return { loadedAlbums: [] };
  },

  componentDidMount: function() {
    const { getCollection } = this.props;
    if (typeof getCollection === 'function') {
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
    const h = window.h;

    // Featured image
    const rawImage = entry.getIn(['data', 'image', 'feature']);
    const imgWidth = entry.getIn(['data', 'image', 'feature_width']);
    let purl = null;
    if (rawImage) {
      const resolved = this.props.getAsset(rawImage).toString();
      purl = resolved.startsWith('https://') ? resolved : `/images/${resolved}`;
    }

    return h('div', {},
      // --- Page Header ---
      h('section', { id: 'page-header', className: 'clearfix' },
        h('div', { className: 'wrapper' },
          h('h1', {}, title)
        )
      ),

      // --- Main ---
      h('div', { className: 'wrapper', id: 'main' },
        // Featured image
        purl ? h('img', { src: purl, width: imgWidth || undefined }) : null,

        h('section', { id: 'content' },
          // Intro
          entry.getIn(['data', 'intro_text'])
            ? h('div', { className: 'row' },
                h('div', { className: 'grid_12' },
                  this.props.widgetFor('intro_text')
                )
              )
            : null,

          // PublicAlbum carousel (static, matches layout)
          h('div', { className: 'row' },
            h('div', { className: 'grid_12' },
              h('script', { src: 'https://cdn.jsdelivr.net/npm/publicalbum@latest/embed-ui.min.js', async: true }),
              h('div', {
                className: 'pa-carousel-widget',
                style: { width: '100%', height: '480px', display: 'none' },
                'data-link': 'https://photos.google.com/share/AF1QipPfub4iIqDfra5tBsIYZKvKJjIR4VYAHLW_yYHHXJqE_remlPhgtZ0wise3VxI6Jw?key=UFdCcWdRU1laMXN5ajU4d28wbUMwNEtRRFhmQnJn',
                'data-title': 'Cornwallis Views · Jul 3, 2019 – Jan 9, 2021 📸',
                'data-description': 'Shared album · Tap to view!'
              },
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczMe5us3xyl0QplJullS05odm9o82oITv9nreXenkyxaCwt73dbJnu1nqxya3HjHOrF1iiJf7pHjjiq3a48Y0-oyf-FmlvLBXAC850PuMQyJQqhXTkU=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczPVEQ5xvkEZel4-_CBgYYRsWgb_7B8qZpInunaw6cDyGm-48Yw6TwdsYza02ysOqRZoWeLJ-mhEaQDbaibyPckyapWE8vQjIUbVtvDFowu9NyMeprM=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczN7HXTK9vKr2elWpx4JxyRA6rEcxrKVxZ51hy_v4zCLukemHG9tkdfvDth9LWnnxdGKOk32vx5-YyolWJQwsKa8Hv9BAhGNlcXSwcONufZb3Fsaa34=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczN7XEJh4c8uQ6NzTHuZvnlpw5WS16cRf2HaqC7gFYkU3T_7vrBAJvDTcfj_R-x3RCtSYmK1gRSEVOFYTSaeex8D4VsqDI8uz-o160h1l7lM84_X14o=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczM8Fb6QVdjtBfH022QqTiaOla8gopZVty9EZraapsqYS5Cc-0L6KCIKi5zqwL1uQFOdvGll99quHZkPb-YXFaakj-lV2lvgQB6wOFmxuP5KA4LAamk=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczMYsytj-ApyAYhAqgRc_MN5RdpQXhoXuSw8Y7GNkpTESuAk45KvHHkn9OZs4vqywJEqJUwQT6RK87f9eC8m2rMPaK7kfdgLeiLFC3pTjAx-QrYr36o=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczMPVfTPD7rcJ1o6L_eSdrJG1I-yy55tVlhjTdKRBmwJaoEq10UZ1T0HrEWBd5fVBIyv--XOTz1cDzoGMTAyBI03UpvEUkk-l088lW-gCNTLFTVOaj8=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczOi_ASoshALLT1bnbSTS88XwvPAhfb8V-zUykpf2AFZ1scVnU20LWCNItrT1VL-oBpT0kPbhCkPpKEevO1kJsX8FzcTMx3foO3llFINh1bBmrTWtJs=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczPZJih35QJNKb0p6qMp8IqmnJEj3twKTcSDhjEn44_gKsLKE9--qEH83hPiJs2dGObeDYtkEkmmrqAsMlCNht2fSWpubgkZwsAH9AuMiHiiqx-dloQ=w1920-h1080' }),
                h('object', { data: 'https://lh3.googleusercontent.com/pw/AP1GczOBxue8F43F0LlYevPdtEGNzA6IETeIlkvEs-raYiBfSpK5wuB8QEj-uDqYC2iVOn0mgF4kxf3nlOtdpNR7x7A1BAk8C6E0O0v6UTYQj8P54hWF9RU=w1920-h1080' })
              )
            )
          ),

          // Albums list
          this.state.loadedAlbums.length > 0
            ? h('div', { className: 'row' },
                h('div', { className: 'grid_12' },
                  h('h2', {}, 'Links to Cornwallis Neighborhood Shared Albums'),
                  h('ul', {},
                    this.state.loadedAlbums.map((album, idx) =>
                      h('li', { key: idx },
                        h('a', { href: album.getIn(['data', 'external_url']) || '#' },
                          album.getIn(['data', 'title']) || 'Untitled'
                        )
                      )
                    )
                  )
                )
              )
            : null,

          // Sponsors
          h('div', { className: 'row' },
            h('div', { className: 'grid_6' }),
            h('div', { className: 'grid_6' },
              h('div', { style: { color: '#a0aec0', fontStyle: 'italic' } }, 'Sponsors')
            )
          )
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('photos_page', PhotosPagePreview);
