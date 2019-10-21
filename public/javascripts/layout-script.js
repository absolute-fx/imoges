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
    let email = $("#email-nl").val();
    console.log(email);

    let api_url = api_path + 'newsletter';
    console.log(api_url);
    let request = new XMLHttpRequest();
    request.open('POST', api_url, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onload = function(){
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
        }
    };

    request.send('email=' + email);

    return false;
});
/*

$("#nl_form").submit(function(){
    $.ajax({
        url: api_path + 'newsletter',
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log(result);
        }
    })
    return false;
});
*/
