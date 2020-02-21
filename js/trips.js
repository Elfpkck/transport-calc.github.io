function calculateCity(trips, price, reducer, limit, kiev) {
    var res
    var currency

    if (trips == '') {
        res = '';
        currency = '';
    }
    else if ((Number(trips) < 1) || (Number(trips) % 1 !== 0)) {
        res = "Некорректные данные";
        currency = "";
    }
    else {
        if (kiev) {currency = "грн."} else {currency = "руб."}

        var i
        var res = 0;
        var step = 0;

        while (step < limit) {
            if (kiev) {
                i = 9;
                kiev = false;
            }
            else {
                i = 10;
            }

            if (trips <= step + i && trips > step) {break;}

            step += i;
            res += price * i;
            price -= reducer;
        }
        res = res + (trips - step) * price
    }

    return {
        res: res,
        currency: currency
    };
}

function calculateTrips() {
    if ($("form input[name='city']").is(":not(:checked)")) {
        var res = "Выберите город";
        var currency = "";
    }
    if ($("form input[name='city']").is(':checked')) {
        var a = $("form input[id='trips']").val();
        var radio_btn = $("form input[name='city']:checked").val();

        if (radio_btn == "spb") {
            var results = calculateCity(a, 38, 1, 40, false);
        } else if (radio_btn == "kiev") {
            var results = calculateCity(a, 8, 0.3, 49, true);
        }
        var res = results.res;
        var currency = results.currency;

        if (Number(res) === res && res % 1 !== 0) {
            res = res.toFixed(2);
            res = res.toString().replace(".", ",");
        }
    }

    $("#target").empty();
    $("#target").prepend(res + ' ' + currency);
}

$(document).ready(function () {
    $("form input[name='city']").on('change', calculateTrips);
    $("form input[id='trips']").on('input', calculateTrips);

    //disable form submit on enter
    $("form input[id='trips']").on('keyup keypress', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    })
});
