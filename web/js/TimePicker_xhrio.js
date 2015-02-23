// Copyright 2008 Google Inc. All Rights Reserved.

goog.provide('cic.client.DatePicker');
goog.provide('cic.client.makeDatePickers');

goog.require('goog.dom');
goog.require('goog.ui.DatePicker');
goog.require('goog.i18n.DateTimeFormat');
goog.require('goog.i18n.DateTimeParse');
goog.require('goog.ui.InputDatePicker');
goog.require('goog.net.XhrIo')

/**
 * Iterates over a list of note data objects, creates a
 * cic.client.DatePicker instance for each one, and tells the instance to build
 * its DOM structure.
 * @param {string} tagName the Name of the single DOM.
 * @param {string} tagElementId the ID of the single DOM.
 * @param {Element} tagContainer the element under which DOM nodes for
 *     the date pickers should be added.
 * @return {!cic.client.makeDatePickers} An object contain datepicker parameters and DOM instances.
 */
cic.client.makeDatePickers = function(tagName, tagElementId, tagButtonId, tagContainer) {
    //define a new object used for DOM creation.
    var  tagDom = new cic.client.DatePicker(tagName, tagElementId, tagButtonId, tagContainer);

    //create the DOM element using the prototype functions
    tagDom.makeNoteDom_();
    return tagDom;
};

//keep the instances exact name otherwise the html may not find the definition of the var
goog.exportSymbol('makeDatePickers', cic.client.makeDatePickers);
/**
 * Manages the data and interface for a single date picker.
 * @param {string} title The tile of the div.
 * @param {string} id The id of the div.
 * @param {!Element} blockContainer The element under which DOM nodes for
 *     the notes should be added.
 * @constructor
 * @struct
 */
cic.client.DatePicker = function(title, text_id, button_id, blockContainer) {
    /** @private {string} */
    this.title_ = title;

    /** @private {string} */
    this.text_id_ = text_id;

    /** @private {!Element} */
    this.parent_ = blockContainer;

    /** @private {Element} */
    this.headerElement_ = null;

    /** @private {Element} */
    this.calendar_ = null;

    /** @private {Element} */
    this.button_ = null;

    /** @private {Element} */
    this.button_id_ = button_id;

    /** @private {!Element} */
    this.sysTime_ = null;
};

/**
 * Creates the DOM structure for the note and adds it to the document.
 * @private
 */
cic.client.DatePicker.prototype.makeNoteDom_ = function() {
    // Create DOM structure to represent the note.
    //label to show the user what does this datepicker stand for
    this.headerElement_ = goog.dom.createDom('label', {'for': this.text_id_}, this.title_);

    //container to show the exact date the user picked
    this.calendar_ = goog.dom.createDom('input',{'id':this.text_id_,'type': 'text', 'value': ''});

    //button to create the request and send through XhrIo.
    this.button_ = goog.dom.createDom('input',{'id':this.button_id_, 'type':'button', 'value': 'change'});

    //combine those two DOM element inside of a single div element and create that node
    //as the child node.
    var newNote = goog.dom.createDom('div', null, this.headerElement_, this.calendar_, this.button_);

    // Add the note's DOM structure to the document.
    this.parent_.appendChild(newNote);

    this.openCalendar_();

    //goog.events.listen(this.calendar_, goog.events.EventType.CLICK, this.openCalendar_(), false, this);
    //call the function to open that calendar
    goog.events.listen(this.button_, goog.events.EventType.CLICK,
        this.changeDate_, false, this);

};


/**
 *  Create the calendar for the timepicker
 *  @private
 */
cic.client.DatePicker.prototype.openCalendar_ = function() {
    var Pattern = "MM'/'dd'/'yyyy";
    var formatter = new goog.i18n.DateTimeFormat(Pattern);
    var parser = new goog.i18n.DateTimeParse(Pattern);

    var idp1 = new goog.ui.InputDatePicker(formatter, parser);
    idp1.decorate(goog.dom.getElement(this.text_id_));
};

/**
 * Retrieve text data using XhrIo's static send() method.
 *
 * @private
 */
cic.client.DatePicker.prototype.changeDate_ = function() {
    var sysDateUrl = "http://localhost:8080/systime";
    var that = this;
    goog.net.XhrIo.send(sysDateUrl, function(e) {
        var xhr = e.target;
        that.sysTime_ = xhr.getResponseJson();
        document.getElementById(that.text_id_).value = that.sysTime_['date'];
    })
}

