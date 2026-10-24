// Pure JS file - DO NOT include HTML <script> tags here
const CalendarPagePreview = window.createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || 'CNA Shared Calendar';
    const calendarUrl = entry.getIn(['data', 'calendar_url']);

    return window.h('div', { 
      className: 'calendar-page-preview', 
      style: { padding: '20px', fontFamily: 'sans-serif' } 
    },
      // 1. Render Page Title
      window.h('h1', {}, title),
      
      // 2. Safely render parsed Markdown links block natively
      window.h('div', { className: 'intro-content' }, 
        this.props.widgetFor('intro_text')
      ),

      // 3. Render Live Google Calendar Iframe Component
      calendarUrl ? window.h('div', { style: { marginTop: '20px' } },
        window.h('iframe', {
          src: calendarUrl,
          style: { border: '0' },
          width: '100%',
          height: '600px',
          frameBorder: '0',
          scrolling: 'no'
        })
      ) : window.h('div', { style: { padding: '10px', background: '#fff3cd', color: '#856404', marginTop: '20px' } }, 
          'Enter a Google Calendar Embed URL to see the live iframe preview.'
        )
    );
  }
});

// Register template link mapping
CMS.registerPreviewTemplate("calendar_page", CalendarPagePreview);
