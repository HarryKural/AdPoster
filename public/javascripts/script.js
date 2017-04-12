/**
 * Created by Harshit Sharma on 26-Mar-2017.
 */
// Initialize collapse button
$(".button-collapse").sideNav();

$('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    }
);

// auto resize of textarea
$('#message').trigger('autoresize');


// Reference: http://jsfiddle.net/herdiansc/dnznh/8/
// ---------------- Show Password Functionality ------------
(function ($) {
    $.toggleShowPassword = function (options) {
        var settings = $.extend({
            field: "#password",
            control: "#toggle_show_password",
        }, options);

        var control = $(settings.control);
        var field = $(settings.field);

        control.bind('click', function () {
            if (control.is(':checked')) {
                field.attr('type', 'text');
            } else {
                field.attr('type', 'password');
            }
        })
    };
}(jQuery));

$.toggleShowPassword({
    field: '#password',
    control: '#showPass'
});

// use jQuery for delete confirmation popup
$('.confirmation').on('click', function() {
    return confirm('Are you sure you want to delete this?');
});
