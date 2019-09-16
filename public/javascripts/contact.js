getProjects();

$(document).ready(()=>{
    $('#select_projects').change(function(){
        getRealties(this.value);
    });
});

function getProjects(){
    let api_url = 'http://127.0.0.1:4000/api/projects?active=1&order_field=id&order_direction=desc&diffused=1';
    let request = new XMLHttpRequest();
    request.open('GET', api_url, true);
    request.onload = function(){
        let data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            setSelect('projects', data);
            console.log(data);
        }
    };
    request.send();
}


function getRealties(projectId) {
    if(projectId !== ""){
        let api_url = 'http://127.0.0.1:4000/api/projects/' + projectId + '/realties?active=1&order_field=id&order_direction=desc&status=0';
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

