document.addEventListener('DOMContentLoaded', () => {
    // 1. Check API Status
    const statusDot = document.getElementById('status-dot');
    const statusText = document.getElementById('status-text');

    fetch('/api/status')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'online') {
                statusDot.classList.add('online');
                statusText.textContent = 'API: Online';
            }
        })
        .catch(error => {
            statusDot.classList.add('offline');
            statusText.textContent = 'API: Offline';
            console.error('Error fetching API status:', error);
        });

    // 2. Handle Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Reset status
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                formStatus.textContent = result.message;
                formStatus.classList.add('success');
                contactForm.reset();
            } else {
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.classList.add('error');
            }
        } catch (error) {
            formStatus.textContent = 'Failed to connect to the server.';
            formStatus.classList.add('error');
            console.error('Error submitting form:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
});