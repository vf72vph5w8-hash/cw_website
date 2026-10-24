var SiteDocumentsPreview = createClass({
  render: function() {
    var documents = this.props.entry.getIn(['data', 'documents']);

    if (!documents) {
      return h('div', {}, 'No documents yet.');
    }

    return h('div', {},
      h('h2', {}, 'Association Documents'),
      h('ul', {},
        documents.map(function(doc, i) {
          return h('li', { key: i },
            h('a', { href: doc.get('url'), target: '_blank' }, doc.get('title'))
          );
        })
      )
    );
  }
});

CMS.registerPreviewTemplate('drive_links', SiteDocumentsPreview);   