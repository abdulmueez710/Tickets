document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    console.log('Form Data:', {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
    });

    document.getElementById('alert').style.display = 'block';
    document.getElementById('contactForm').reset();

    setTimeout(function() {
        document.getElementById('alert').style.display = 'none';
    }, 4000);
});