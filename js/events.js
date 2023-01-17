function sendEvent(action, category, label, value) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label,
        'value': value
    });
}

$("#sendEmail").click(function () {
    sendEvent("click", "contact", "email");
})
$("#phoneCall").click(function () {
    sendEvent("click", "contact", "phone");
})
$("#whatsappChat").click(function () {
    sendEvent("click", "contact", "whatsapp");
})
$("#facebookChat").click(function () {
    sendEvent("click", "contact", "facebook");
})

$('#contact-form').on('submit', function(event) {
    event.preventDefault(); // prevent reload

    var formData = new FormData(this);
    formData.append('service_id', 'sendgrid');
    formData.append('template_id', 'contact');
    formData.append('user_id', 'user_aOOagFzIvXwNrk0mRZE5S');
    formData.append('from_name', $('#name').val());
    formData.append('phone', $('#phone').val());
    formData.append('from_email', $('#email').val());
    formData.append('message', $('#message').val());

    $.ajax('https://api.emailjs.com/api/v1.0/email/send-form', {
        type: 'POST',
        data: formData,
        contentType: false, // auto-detection
        processData: false // no need to parse formData to string
    }).done(function() {
        $('#message-sent').removeClass('d-none');
        $('#contact-form').addClass('d-none');
    }).fail(function(error) {
        alert('Oops... ' + JSON.stringify(error));
    });
});
