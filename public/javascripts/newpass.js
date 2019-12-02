$('#newpassform').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    if($("#password").val() === $("#repeat_password").val()){
        if($("#password").val().length >= 6) {
            $.post('/auth/savepass', formData, function (data) {
                console.log(data);
                if (data.message) {
                    $('#newpassBox').html(setInfobox());
                    _toastr(data.message, "bottom-right", "success", false);
                } else {
                    $("#email").addClass('error');
                    _toastr(data, "bottom-right", "error", false);
                }
            });
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
    txt += '<h4>Votre nouveau mot de passe a été enregistré</h4>';
    txt += '<p>Votre nouveau mot de passe a été enregistré avec succès, vous pouvez dès à présent vous connecté avec celui-ci</p>';
    txt += '</div>';
    return txt;
}