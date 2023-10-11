'use strict'

const form = document.getElementById('form')
const inputFrom = form.querySelector('#from')
const inputTo = form.querySelector('#to')
const selectorFrom = form.querySelector('#currency-from')
const selectorTo = form.querySelector('#currency-to')
const btnReplace = form.querySelector('#replace')
const btnConvert = form.querySelector('#convert')

const endpoint = 'latest';
const accessKey = '3362c43dc9d30dc0f8f7cd3cbd72bdad';
const from = 'EUR';
const to = 'GBP';
const amount = '10';

const render = (data) => {
    btnConvert.addEventListener('click', (e) => {
        e.preventDefault()

        const valueFrom = selectorFrom.value
        const valueTo = selectorTo.value

        if (valueFrom && valueTo && inputFrom.value !== '') {
            switch (valueFrom + valueTo) {
                case 'RUBUSD':
                    inputTo.value = (parseFloat(inputFrom.value) / data.rates.RUB * data.rates.USD).toFixed(2)
                    break;
                case 'USDRUB':
                    inputTo.value = (parseFloat(inputFrom.value) / data.rates.USD * data.rates.RUB).toFixed(2)
                    break;
                case 'RUBEUR':
                    inputTo.value = (parseFloat(inputFrom.value) / data.rates.RUB).toFixed(2)
                    break;
                case 'EURRUB':
                    inputTo.value = (parseFloat(inputFrom.value) * data.rates.RUB).toFixed(2)
                    break;
                case 'USDEUR':
                    inputTo.value = (parseFloat(inputFrom.value) / data.rates.USD).toFixed(2)
                    break;
                case 'EURUSD':
                    inputTo.value = (parseFloat(inputFrom.value) * data.rates.USD).toFixed(2)
                    break;
            }
        }
    });
};

const getData = (url) => {
    return fetch(url, {
        method: "GET",
    })
        .then(response => response.json())
        .then(data => render(data))
        .catch(error => {
            console.log(error.message);
        })
};

form.addEventListener('input', (e) => {
    if (e.target.id === 'from') {
        e.target.value = e.target.value.replace(/[^\d+\.]/g, '')
        if (e.target.value.includes('.') && e.target.value.match(/\./g).length > 1) {
            e.target.value = e.target.value.substr(0, e.target.value.lastIndexOf('.'));
        }
    };

    if (e.target.id === 'currency-from') {
        if (!e.target.value) {
            for (let i = 0; i < selectorTo.children.length; i++) {
                selectorTo.children[i].removeAttribute('disabled', 'disabled')
            }
        } else {
            for (let i = 0; i < selectorTo.children.length; i++) {
                if (selectorTo.value === e.target.value) {
                    selectorTo.value = ""
                };

                if (selectorTo.children[i].value === e.target.value) {
                    selectorTo.children[i].setAttribute('disabled', 'disabled')
                } else {
                    selectorTo.children[i].removeAttribute('disabled', 'disabled')
                };
            };
        }
    };

    if (e.target.id === 'currency-to') {
        if (!e.target.value) {
            for (let i = 0; i < selectorFrom.children.length; i++) {
                selectorFrom.children[i].removeAttribute('disabled', 'disabled')
            }
        } else {
            for (let i = 0; i < selectorFrom.children.length; i++) {
                if (!e.target.value) {
                    selectorFrom.children[i].removeAttribute('disabled', 'disabled')
                }

                if (selectorFrom.value === e.target.value) {
                    selectorFrom.value = ""
                };

                if (selectorFrom.children[i].value === e.target.value) {
                    selectorFrom.children[i].setAttribute('disabled', 'disabled')
                } else {
                    selectorFrom.children[i].removeAttribute('disabled', 'disabled')
                };
            };
        }
    };
});

btnReplace.addEventListener('click', (e) => {
    e.preventDefault()

    let valueFrom = selectorFrom.value
    let valueTo = selectorTo.value

    selectorFrom.value = valueTo
    selectorTo.value = valueFrom
});

getData('http://data.fixer.io/api/' + endpoint + '?access_key=' + accessKey)