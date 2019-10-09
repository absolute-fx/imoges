let realtiesAvailable = [];
$(document).ready(function(){
    const labels = $('.label-count');
    const labelsTotal = labels.length;
    let i = 0;
    $('.label-count').each(function(){
        let projectId = $(this).data('projectid');
        let api_url = api_path + 'projects/' + projectId + '/realties?active=1&status=0&countonly=1';
        let request = new XMLHttpRequest();
        request.open('GET', api_url, true);
        request.onload = function(){
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                realtiesAvailable.push(data.totalRealties);
                if(data.totalRealties > 0){
                    $('.mega-menu').find(`[data-projectid=${ projectId }]`).addClass('label-success').html(data.totalRealties);
                }else{
                    $('.mega-menu').find(`[data-projectid=${ projectId }]`).addClass('label-red').html(data.totalRealties);
                }
                i++;
                //console.log(data);
                if(i == labelsTotal) getRealtiesTotalNumber();
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

function getRealtiesTotalNumber(){
    let totalRealties = [];
    const pBox = $('.home-project-box');
    const pBoxLength = pBox.length;
    let i = 0;

    $('.home-project-box').each(function(){
        let projectId = $(this).data('projectid');
        let api_url = api_path + 'projects/' + projectId + '/realties?active=1&countonly=1';
        let request = new XMLHttpRequest();
        request.open('GET', api_url, true);
        request.onload = function(){
            let data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                //console.log(data);
                totalRealties.push(data.totalRealties);
                i++;
                if(i == pBoxLength) setHomeProjectRibbon(totalRealties);
            }
        };
        request.send();
    });
    //console.log(totalRealties);
}

function setHomeProjectRibbon(tR){
    let P1_sold = tR[0] - realtiesAvailable[0];
    let P2_sold = tR[1] - realtiesAvailable[1];
    let prj_pct = [];
    prj_pct.push(Math.round((P1_sold * 100) / tR[0]));
    prj_pct.push(Math.round((P2_sold * 100) / tR[1]));
    let i = 0;
    console.log(prj_pct);
    $('.home-project-box').each(function(e){
        if(prj_pct[i] > 0 && prj_pct[i] !== 100){
            $(this).find(".ribbon").show().find(".ribbon-inner").html(prj_pct[i] + "% vendu");
        }
        i++
    });
}