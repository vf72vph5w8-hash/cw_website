// sponsors_page.js
var CMS = window.CMS;
var h = window.h;

var SponsorsPagePreview = createClass({
  render: function() {
    var entry = this.props.entry;
    var fieldsMetaData = this.props.fieldsMetaData;

    var title = entry.getIn(['data', 'title']) || 'Sponsors';

    // 1. Pull the selection array strings from the form field state
    var sponsorsList = entry.getIn(['data', 'sponsors_list']);
    var rawList = sponsorsList && sponsorsList.toJS ? sponsorsList.toJS() : [];

    // 2. Map the array into pure HTML strings by checking fieldsMetaData synchronously
    var sponsorsHtml = rawList.map(function(name) {
      // Fixed: Mapped query directly to ['sponsors_list', 'sponsors', name] matching the debug mapping output
      var sponsorData = fieldsMetaData.getIn(['sponsors_list', 'sponsors', name]);

      if (!sponsorData) {
        return '<p style="color: #999; font-style: italic;">Loading information for ' + name + '...</p>';
      }

      var business = sponsorData.get('business');
      var displayTitle = sponsorData.get('title') || business;
      var website = sponsorData.get('website') || '';
      var logo = sponsorData.get('logo') || '';
      var contactName = sponsorData.get('contact_name') || '';
      var phone = sponsorData.get('phone') || '';
      var email = sponsorData.get('email') || '';

      // Pure HTML template literal block structure matching your layout specifications
      return `
        <div style="margin-bottom: 30px; border-bottom: 1px dashed #eee; padding-bottom: 20px;">
          <h2>${website ? `<a href="${website}" target="_blank">${displayTitle}</a>` : displayTitle}</h2>
          <div class="row">
            <div class="grid_7" style="float: left; width: 55%;">
              ${logo ? `<a href="${website || '#'}"><img src="${logo}" width="70%" style="float: left; margin-right: 20px;" alt="${displayTitle}" /></a>` : ''}
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
      `;
    }).join('');

    // 3. Output the layout wrapping container cleanly via dangerouslySetInnerHTML
    return h('div', {
      dangerouslySetInnerHTML: {
        __html: `
          <section id="page-header" class="clearfix">
            <div class="wrapper"><h1>${title}</h1></div>
          </section>
          <div class="wrapper" id="main">
            <section id="content">
              ${sponsorsHtml || '<p style="color: #666; font-style: italic;">No sponsors currently selected in the admin checklist pane.</p>'}
            </section>
          </div>
        `
      }
    });
  }
});

// Register the compiled view directly to your main sponsors page collection settings
CMS.registerPreviewTemplate('sponsors_page', SponsorsPagePreview);
