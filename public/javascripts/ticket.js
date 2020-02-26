function closeTicket(id){
    location.href = "../tickets/close?id=" + id;
}

function setWoDate(id){
    let date = $('#ticket-plan-date').val();
    let realtyId = $('#inputRealtyId').val();
    if(date){
        location.href = "../tickets/plan?id=" + id + "&date=" + date + "&realtyId=" + realtyId;
    }else{
        $('#ticket-plan-date').parent().after('<div class="alert alert-danger margin-top-20" role="alert">Ajoutez une date dans le champ ci-dessus!</div>');
    }
}

function setWoDone(id){
    let realtyId = $('#inputRealtyId').val();
    location.href = "../tickets/done?id=" + id + "&realtyId=" + realtyId;
}