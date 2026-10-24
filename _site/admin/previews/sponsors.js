var SponsorsPreview = createClass({
  render: function() {
    var sponsors = this.props.entry.getIn(['data', 'sponsors']);

    if (!sponsors) {
      return h('div', { style: { padding: '1.5rem', fontFamily: 'sans-serif' } }, 'No sponsors yet.');
    }

    var sorted = sponsors.sortBy(function(s) {
      return s.get('weight') || 999;
    });

    return h('div', { style: { fontFamily: 'sans-serif', padding: '1.5rem' } },

      // === DIRECTORY LIST ===
      h('h2', { style: { margin: '0 0 1.5rem' } }, 'Sponsors Directory'),

      h('div', { style: { display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' } },

        sorted.map(function(sponsor, i) {
          var logo = sponsor.get('logo');
          var logoSrc = logo ? this.props.getAsset(logo).toString() : '';
          var url = sponsor.get('url') || '';
          var heading = sponsor.get('tagline') || sponsor.get('company_name') || '';
          var desc = sponsor.get('contact_name')
            ? sponsor.get('contact_name') + ', ' + (sponsor.get('company_name') || '')
            : sponsor.get('company_name') || '';

          return h('div', { key: i },

            h('h2', { style: { margin: '0 0 0.75rem' } },
              url
                ? h('a', { href: url, target: '_blank' }, heading)
                : heading
            ),

            h('div', { style: { display: 'flex', gap: '1rem', alignItems: 'flex-start' } },

              h('div', { style: { flex: '0 0 58%' } },
                h('a', { href: url || '#', target: '_blank' },
                  logoSrc
                    ? h('img', { src: logoSrc, style: { width: '70%' } })
                    : h('div', { style: { width: '70%', height: '100px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' } }, 'No logo')
                )
              ),

              h('div', { style: { flex: '1', fontSize: '0.95rem', lineHeight: 1.8 } },
                h('div', {}, desc),
                sponsor.get('phone')
                  ? h('div', {}, 'Phone: ', h('a', { href: 'tel:' + sponsor.get('phone') }, sponsor.get('phone')))
                  : null,
                sponsor.get('email')
                  ? h('div', {}, 'Email: ', h('a', { href: 'mailto:' + sponsor.get('email') }, sponsor.get('email')))
                  : null,
                url
                  ? h('div', {}, 'Link: ', h('a', { href: url, target: '_blank' }, url))
                  : null
              )
            )
          );
        }.bind(this))
      ),

      // === CAROUSEL STRIP ===
      h('h2', { style: { margin: '0 0 1rem' } }, 'Sponsor Carousel Preview'),

      h('div', { style: { overflowX: 'auto', whiteSpace: 'nowrap', padding: '1rem 0', border: '1px solid #e0e0e0', borderRadius: '8px' } },

        h('div', { style: { display: 'inline-flex', gap: '1.5rem' } },

          sorted.map(function(sponsor, i) {
            var logo = sponsor.get('logo');
            var logoSrc = logo ? this.props.getAsset(logo).toString() : '';
            var url = sponsor.get('url') || '';
            var caption = sponsor.get('contact_name')
              ? sponsor.get('contact_name') + ', ' + (sponsor.get('company_name') || '')
              : sponsor.get('company_name') || '';

            return h('div', { key: i, style: { display: 'inline-block', width: '220px', textAlign: 'center', verticalAlign: 'top' } },

              h('a', { href: url || '#', target: '_blank' },
                logoSrc
                  ? h('img', { src: logoSrc, style: { width: '100%', maxHeight: '120px', objectFit: 'contain' } })
                  : h('div', { style: { width: '100%', height: '120px', background: '#f0f0f0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '0.8rem' } }, 'No logo')
              ),

              h('p', { style: { fontSize: '0.8rem', lineHeight: 1.6, whiteSpace: 'normal', marginTop: '0.5rem' } },
                url
                  ? h('a', { href: url, target: '_blank' }, caption)
                  : caption,
                h('br'),
                sponsor.get('phone')
                  ? h('a', { href: 'tel:' + sponsor.get('phone') }, sponsor.get('phone'))
                  : null,
                h('br'),
                sponsor.get('email')
                  ? h('a', { href: 'mailto:' + sponsor.get('email') }, 'Email Us!')
                  : null
              )
            );
          }.bind(this))
        )
      )
    );
  }
});

CMS.registerPreviewTemplate('sponsors_manager', SponsorsPreview);   