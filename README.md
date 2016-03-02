# ResumeWebsite
AngualrJS Application with custom CMS

This is the source code to a resume website I created to showcase my skills and accomplishments.

The application is built in AngularJS and featues a custom CMS built with AngularJS, PHP, and MySQL.
The CMS source can be found in the "Admin" directory.

The Less files are compiled using Grunt.

All site content is poplulated using the 2-way binding provided by AngularJS.
When the site loads and directives are compiled they call the content service and retrieve JSON and set the resonse to the data model.

The content is maintained in the CMS in a similar way. The form inputs are bound to the model that in sent to the PHP service that updates the content in the data base.