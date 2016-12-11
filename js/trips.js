function calculateSPB(a) {
    var currency = "руб."
    var res
    if (a >= 1 && a <= 10) {
        res = a * 34;
    } else if (a >= 11 && a <= 20) {
        res = 340 + (a - 10) * 33;
    } else if (a >= 21 && a <= 30) {
        res = 340 + 330 + (a - 20) * 32;
    } else if (a >= 31 && a <= 40) {
        res = 340 + 330 + 320 + (a - 30) * 31;
    } else if (a >= 41) {
        res = 340 + 330 + 320 + 310 + (a - 40) * 30;
    } else if (a == "") {
        res = "";
        currency = '';
    } else {
        res = "Некорректные данные";
        currency = '';
    }
    return {
        result: res,
        currency: currency
    };
}

function calculateKiev(a) {
    var currency = "грн."
    if (a >= 1 && a <= 9) {
        res = a * 4;
    } else if (a >= 10 && a <= 19) {
        res = 9 * 4 + (a - 9) * 3.9;
    } else if (a >= 20 && a <= 29) {
        res = 9 * 4 + 10 * 3.9 + (a - 19) * 3.8;
    } else if (a >= 30 && a <= 39) {
        res = 9 * 4 + 10 * 3.9 + 10 * 3.8 + (a - 29) * 3.7;
    } else if (a >= 40 && a <= 49) {
        res = 9 * 4 + 10 * 3.9 + 10 * 3.8 + 10 * 3.7 + (a - 39) * 3.6;
    } else if (a >= 50) {
        res = 9 * 4 + 10 * 3.9 + 10 * 3.8 + 10 * 3.7 + 10 * 3.6 + (a - 49) * 3.5;
    } else if (a == "") {
        res = "";
        currency = '';
    } else {
        res = "Некорректные данные";
        currency = '';
    }
    return {
        result: res,
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
            var results = calculateSPB(a);
            var res = results.result;
            var currency = results.currency;
        } else if (radio_btn == "kiev") {
            var results = calculateKiev(a);
            var res = results.result;
            var currency = results.currency;
        }
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
});
