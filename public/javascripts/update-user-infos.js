$("#user_form").submit(function(){
    let formData = $(this).serialize();
    $.post( '../account/userupdate', formData, function(data) {
        if(data.auth){
            _toastr("Vos informations ont été modifiées","bottom-right","success",false);
        } else{
            _toastr("Problème lors de la modification","bottom-right","error",false);
        }
    });
    return false;
});
