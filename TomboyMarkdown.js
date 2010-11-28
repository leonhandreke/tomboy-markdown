function TomboyMarkdown () {
    this._init ();
}

TomboyMarkdown.prototype = {
    _init : function () {
                this.TomboyElements = {
                    bold : { open: '**', close: '**' },
                    italic : { open: '*', close: '*' },
                    strikethrough : { open: '-', close: '-' },
                    highlight : { open: '***', close: '***' },
                    monospace : { open: '`', close: '`' },

                    'size:small' : { open: '### ', close: ' ###' },
                    'size:large' : { open: '## ', close: ' ##' },
                    'size:huge' : { open: '# ', close: ' #' },

                    'list-item' : { open : '* ', close : '' }
                }; 
            },

    startElement : function (name, attributes) {
                       if (name in this.TomboyElements) {
                           this._outputStream += this.TomboyElements[name].open;
                       }
                   },

    endElement : function (name) {
                       if (name in this.TomboyElements) {
                           this._outputStream += this.TomboyElements[name].close;
                       }
                   },

    characters : function (data, start, length) {
                     this._outputStream += data.substr(start, length);
                 },

    endDocument : function () {
                      this._callback(this._outputStream);
                  },

    convert : function (tomboy, callback) {
                  this._outputStream = '';
                  this._callback = callback;

                  var saxParser = new SAXDriver();
                  saxParser.setDocumentHandler (this);
                  saxParser.setLexicalHandler (this);
                  saxParser.setErrorHandler (this);
                  saxParser.parse('<note-content>' + tomboy + '</note-content>');
              }
};

