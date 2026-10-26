// sponsor_card.js
var CMS = window.CMS;
var h = window.h;

var SponsorCardPreview = createClass({
  render: function() {
    var entry = this.props.entry;

    // Extract metadata properties directly from the active file entry
    var business = entry.getIn(['data', 'business']) || 'Sponsor Name';
    var title = entry.getIn(['data', 'title']) || '';
    var website = entry.getIn(['data', 'website']) || '';
    var contactName = entry.getIn(['data', 'contact_name']) || '';
    var phone = entry.getIn(['data', 'phone']) || '';
    var email = entry.getIn(['data', 'email']) || '';

    // Resolve the direct asset path mapping for the image upload field
    var logoAsset = entry.getIn(['data', 'logo']);
    var logoUrl = logoAsset ? this.props.getAsset(logoAsset).toString() : '';

    var displayTitle = title ? title : business;

    return h('div', {
      dangerouslySetInnerHTML: {
        __html: `
          <div class="wrapper" id="main" style="padding: 20px; font-family: sans-serif;">
            <section id="content">
              <div style="margin-bottom: 30px; border-bottom: 1px dashed #eee; padding-bottom: 20px; max-width: 800px; margin: 0 auto;">

                <h2>${website ? `<a href="${website}" target="_blank">${displayTitle}</a>` : displayTitle}</h2>

                <div class="row">
                  <div class="grid_7" style="float: left; width: 55%;">
                    ${logoUrl ? `<a href="${website || '#'}"><img src="${logoUrl}" width="70%" style="float: left; margin-right: 20px;" alt="${displayTitle}" /></a>` : ''}
                  </div>

                  <div class="grid_5" style="float: left; width: 40%;">
                    <strong>${contactName ? contactName + ', ' : ''}${business}</strong><br/>
                    ${phone ? `Phone: <a href="tel:${phone}">${phone}</a><br/>` : ''}
                    ${email ? `Email: <a href="mailto:${email}">${email}</a><br/>` : ''}
                    ${website ? `Link: <a href="${website}" target="_blank">${website}</a><br/>` : ''}
                  </div>
                </div>

                <div style="clear: both;"></div>
              </div>
            </section>
          </div>
        `
      }
    });
  }
});

// Register specifically to the collection identifier name on your git repo settings
CMS.registerPreviewTemplate('sponsors', SponsorCardPreview);
