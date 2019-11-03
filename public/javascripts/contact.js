$(document).ready(()=>{
    $('#select_projects').change(function(){
        $('#project_label').val($('#select_projects option:selected').text());
        getRealties(this.value);
    });

    $('#select_realties').change(function() {
        $("#realty_label").val($('#select_realties option:selected').text());
    });

    $('#contact-form').submit(function (e) {
        let formData = $(this).serialize();
        //console.log(formData);
        $.post( '/contactform', formData, function(data) {
            console.log("-> " + data);
            if(data){
                _toastr("Votre message a été envoyé","bottom-right","success",false);
                $("#contact-form")[0].reset();
                $("#select_realties").prop( "disabled", true );
            } else{
                _toastr("Il y a eu un problème lors de l'envoi du message","bottom-right","error",false);
            }
        });
        return false;
    });
});


function getRealties(projectId) {
    if(projectId !== ""){
        let api_url = api_path + 'projects/' + projectId + '/realties?active=1&order_field=id&order_direction=desc&status=0';
        let request = new XMLHttpRequest();
        request.open('GET', api_url, true);
        request.onload = function(){
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                setSelect('realties', data);
                console.log(data);
            }
        };
        request.send();
    }else{
        $("#select_realties").html("").append('<option value="">Choisissez un projet</option>').prop("disabled", true);
    }
}

function setSelect(cat, data){
    if (cat === "realties"){
        $("#select_realties").removeAttr("disabled").html("").append('<option value="">Choisissez un bien</option>');
    }
    for (let d of data[cat]){
        let label = cat === "projects" ?  d.project_title : d.realty_title;
        $('#select_'+ cat).append('<option value="' + d.id + '">' + label + '</option>');
    }
}

