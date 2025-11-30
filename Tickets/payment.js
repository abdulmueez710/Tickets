document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('paymentForm');
    const successMessage = document.getElementById('successMessage');

    document.getElementById('cardNumber').addEventListener('input', function(e){
        let value = e.target.value.replace(/\D/g,'');
        let formattedValue = value.replace(/(\d{4})(?=\d)/g,'$1 ');
        e.target.value = formattedValue;
    });

    document.getElementById('expiryDate').addEventListener('input', function(e){
        let value = e.target.value.replace(/\D/g,'');
        if(value.length>2){ value=value.slice(0,2)+'/'+value.slice(2); }
        e.target.value = value;
    });

    document.getElementById('cvv').addEventListener('input', function(e){
        e.target.value = e.target.value.replace(/\D/g,'');
    });

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const inputs=form.querySelectorAll('input');
        let isValid=true;
        inputs.forEach(input=>{ if(!input.value.trim()){ isValid=false; input.style.borderColor='red'; } else{ input.style.borderColor='#ddd'; } });
        if(isValid){ form.style.display='none'; successMessage.style.display='block'; }
    });
});
