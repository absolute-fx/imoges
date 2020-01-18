$('#login_form').submit(function(e){
    let formData = $(this).serialize();
    console.log(formData);
    $.post( '/auth/signin', formData, function(data) {
        console.log(data);
        if(data.auth){
            $(location).attr('href','/');
        } else{
            _toastr(data.reason,"bottom-right","error",false);
        }
    });
    return false;
});