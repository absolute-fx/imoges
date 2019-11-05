$(document).ready(function(e){

});

$('#login_form').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    $.post( '/auth', formData, function(data) {
        console.log("-> " + data);
        if(data){

        } else{
            _toastr("Problème de connection","bottom-right","error",false);
        }
    });
    return false;
});