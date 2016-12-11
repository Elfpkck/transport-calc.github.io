$(document).ready(function () {
    $('#feedback_form').submit(function(e) {
    	e.preventDefault();
        $.ajax({
            url: 'https://formspree.io/' + 'sub.python' + '@' + 'gmail' + '.' + 'com',
            type: "POST",
            data: $(this).serialize(),
            dataType: 'json',
            success: function(json) {
                $("#hider").trigger('click');
                $('#feedback_form').trigger('reset');
                $("#target_feedback").show();
                setTimeout(function() {$("#target_feedback").hide();}, 5000);
            },
        });
    });
});