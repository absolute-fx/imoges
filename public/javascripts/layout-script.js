$(document).ready(function(){
    const labels = $('.label-count');
    $('.label-count').each(function(){
        let projectId = $(this).data('projectid');
        let api_url = api_path + 'projects/' + projectId + '/realties?active=1&status=0&countonly=1';
        let request = new XMLHttpRequest();
        request.open('GET', api_url, true);
        request.onload = function(){
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                if(data.totalRealties > 0){
                    $('.mega-menu').find(`[data-projectid=${ projectId }]`).addClass('label-success').html(data.totalRealties);
                }else{
                    $('.mega-menu').find(`[data-projectid=${ projectId }]`).addClass('label-red').html(data.totalRealties);
                }
            }
        };
        request.send();
    });
});

$("#nl_form").submit(function(){
    if($("#email-nl").val() !== ""){
        let parameters = { email: $("#email-nl").val() };
        $.get( '/newsletter', parameters, function(data) {
            //console.log("-> " + data);
            $("#email-nl").val("");
            _toastr("Vous avez été enregistré!","bottom-right","success",false);
        });
    }
    else{
        _toastr("Veuillez indiquer votre adresse mail","bottom-right","error",false);
    }

    return false;
});