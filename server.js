var application_root = __dirname,
  express = require( 'express' ),
  path = require( 'path' ),
  mongoose = require( 'mongoose' );

var app = express();

// Configure server
app.configure( function() {
  // parses request body and populates request.body
  app.use( express.bodyParser() );

  // checks request.body for HTTP method overrides
  app.use( express.methodOverride() );

  // perform route lookup based on url and HTTP method
  app.use( app.router );

  // where to serve static content
  app.use( express.static( path.join( application_root, 'site') ) );

  // show all errors in development
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true }));

});

var port = 4711;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
})

// Routes
app.get( '/api', function( request, response) {
  response.send( 'Library API is running' );
});

// Connect to db
mongoose.connect( 'mongodb://localhost/library_database');

// Schemas
var Book = new mongoose.Schema({
  title: String
  author: String,
  releaseDate: Date
});

// Models
var BookModel = mongoose.model( 'Book', Book );