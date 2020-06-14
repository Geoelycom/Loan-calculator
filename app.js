//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {

    // hide Results
    document.getElementById('result').style.display = 'none';

    //show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate Results
function calculateResults() {
    //console.log('calculating...')
    // UI varaibles
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute Monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);


    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // show results
        document.getElementById('result').style.display = 'block';

        // hide Loader
        document.getElementById('loading').style.display = 'none';

    } else {
        showError('please check your numbers')

    }


}
// show error
function showError(error) {

    // Side results
    document.getElementById('result').style.display = 'none';

    // hide Loader
    document.getElementById('loading').style.display = 'none';

    //create div
    const errorDiv = document.createElement('div');
    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //  add class
    errorDiv.className = 'alert alert-danger';

    //create text node and apend to div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 seconds
    setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
    document.querySelector('.alert').remove();
}