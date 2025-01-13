document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('pay-now');

  btn.addEventListener('click', function () {
    // Retrieve form values
    const name = document.getElementById('NAme').value.trim();
    const email = document.getElementById('Email').value.trim();
    const price = document.getElementById('hidden-price').value.trim();

    // Validate inputs
    if (!name || !email || !price) {
      alert("Please fill in all the fields.");
      return;
    }

    // Save customer details
    fetch('/save-customer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, amount: price }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Initialize Paystack payment
          const handler = PaystackPop.setup({
            key: 'pk_live_36cbcfd014a9e909f1b203eefaab7d05446ad166', // Replace with your public key
            email: email,
            amount: price * 100, // Convert to kobo
            currency: 'NGN', // Change to NGN for Naira
            ref: data.transactionRef, // Reference from the server
            metadata: {
              custom_fields: [
                {
                  display_name: "Customer Name",
                  variable_name: "customer_name",
                  value: name,
                },
              ],
            },
            callback: function (response) {
              alert('Payment successful! Transaction reference: ' + response.reference);

              // Save transaction details
              fetch('/save-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  reference: response.reference,
                  email: email,
                  amount: price,
                }),
              });
              window.location.href = "download.ejs"
            },
            onClose: function () {
              alert('Transaction was not completed, window closed.');
            },
          });

          handler.openIframe();
        } else {
          alert('Failed to save customer details. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  });
});
