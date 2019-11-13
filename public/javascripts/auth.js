$(document).ready(function(e){

});

$('#login_form').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    $.post( '/auth', formData, function(data) {
        console.log(data);
        if(data.auth){
            $(location).attr('href','/account');
        } else{
            _toastr(data.reason,"bottom-right","error",false);
        }
    });
    return false;
});