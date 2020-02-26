function closeTicket(id){
    location.href = "../tickets/close?id=" + id;
}

function setWoDate(id){
    let date = $('#ticket-plan-date').val();
    if(date){
        location.href = "../tickets/plan?id=" + id + "&date=" + date;
    }else{
        $('#ticket-plan-date').parent().after('<div class="alert alert-danger margin-top-20" role="alert">Ajoutez une date dans le champ ci-dessus!</div>');
    }
}

function setWoDone(id){
    location.href = "../tickets/done?id=" + id;
}