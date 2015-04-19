'use strict';

var helper = require('jsdoc/util/templateHelper');
var fs = require('jsdoc/fs');
var path = require('jsdoc/path');

exports.publish = function(taffyData, options) {
    var data = helper.prune(taffyData);
    helper.addEventListeners(data);

    var menu = {};
    var docletMap = {};
    var parentDoclets = [];

    // process parent doclets
    data().each(function(doclet) {
        if (!doclet.memberof && doclet.tsdoc) {
            if (!(doclet.tsdoc in menu)) {
                menu[doclet.tsdoc] = [];
            }

            var docletData = {
                doclet: doclet,
                subdoclets: {}
            };

            menu[doclet.tsdoc].push(doclet.longname);
            docletMap[doclet.longname] = docletData;
            parentDoclets.push(docletData);
        }
    });

    // process subdoclets
    data().each(function(doclet) {
        if (doclet.memberof in docletMap) {
            var parent = docletMap[doclet.memberof];
            while (parent.parent) {
                parent = docletMap[parent.parent];
            }

            var subdoclets = parent.subdoclets;
            if (!(doclet.kind in subdoclets)) {
                subdoclets[doclet.kind] = [];
            }

            var subdocletData = {
                doclet: doclet,
                parent: parent.doclet.longname
            };

            subdoclets[doclet.kind].push(subdocletData);
            docletMap[doclet.longname] = subdocletData;
        }
    });

    // create output directory
    var outdir = options.destination;
    fs.mkPath(outdir);

    // create the menu
    var menuFile = path.join(outdir, 'menu.json');
    fs.writeFileSync(menuFile, JSON.stringify(menu));

    // create json files
    parentDoclets.forEach(function(docletData) {
        var docletFile = path.join(outdir, docletData.doclet.longname + '.json');
        fs.writeFileSync(docletFile, JSON.stringify(docletData));
    });
};
