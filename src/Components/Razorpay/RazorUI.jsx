export const loadRazorpay = (src) =>
    new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

export const displayRazorpay = async ({ name, email, phone, date, time, amount = 100, navigate  }) => {
   console.log('Razorpay Key:', process.env.REACT_APP_RAZORPAY_TEST_KEY_ID);

    const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
        alert('Failed to load Razorpay SDK.');
        return;
    }

    const options = {
        key: process.env.REACT_APP_RAZORPAY_TEST_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'AdGrohair & Gloskin',
        description: `Payment for appointment on ${date} at ${time}`,
        image: '',
        handler: function (response) {
            const paymentId = response.razorpay_payment_id;
            // alert(`Payment Successful!\nPayment ID: ${response.razorpay_payment_id}`);
            console.log('Payment Success:', response, paymentId);

            navigate('/payment', {
                state: { paymentId }
            });
        },
        prefill: {
            name,
            email,
            contact: phone,
        },
        notes: {
            appointment_date: date,
            appointment_time: time,
        },
        theme: {
            color: '#3399cc',
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};
