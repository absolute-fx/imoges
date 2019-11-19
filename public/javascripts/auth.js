$(document).ready(function(e){

});

$('#login_form').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    $.post( '/auth/signin', formData, function(data) {
        console.log(data);
        if(data.auth){
            $(location).attr('href','/account');
        } else{
            _toastr(data.reason,"bottom-right","error",false);
        }
    });
    return false;
});


$('#register_form').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    if($("#password").val() === $("#repeat_password").val()){
        if($("#password").val().length >= 6) {
            if ($("#accept_cg").is(':checked')) {
                $.post('/auth/signup', formData, function (data) {
                    console.log(data);
                    if (data.message) {
                        $('#registerBox').html(setInfobox());
                        _toastr(data.message, "bottom-right", "success", false);
                    } else {
                        $("#email").addClass('error');
                        _toastr(data, "bottom-right", "error", false);
                    }
                });
            } else {
                $("#accept_cg").addClass('error');
                _toastr("Vous devez accepter les conditions générales!", "bottom-right", "error", false);
            }
        }else{
            $("#password").addClass('error');
            $("#repeat_password").addClass('error');
            _toastr("Le mot de passe doit contenir minimum 6 caractères!", "bottom-right", "error", false);
        }
    }else{
        // si mdp pas pareils
        $("#password").addClass('error');
        $("#repeat_password").addClass('error');
        _toastr("Les mots de passe ne correspondent pas!","bottom-right","error",false);
    }

    return false;
});

function setInfobox(){
    let txt = '<div class="alert alert-info margin-bottom-30">';
    txt += '<h4>Votre compte a été créé avec succès</h4>';
    txt += '<p>Un email vous a été envoyé pour valider votre compte. Vérifiez dans votre dossier de spam si vous ne le trouvez pas directement.</p>';
    txt += '</div>';
    return txt;
}