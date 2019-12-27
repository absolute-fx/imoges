$('document').ready(function(){
    //console.log(realties)
});

$('#realties-list').change(function(){
    const id = $(this).val();
    const realty = search(parseInt(id), realties);
    const partners = realty.partners;
    if(realty.realty_reception_date){
        if(parseInt(realty.realty_warranty) < realty.months_from_reception ){
            $('#infos-holder').html(setInfoHolder('no-warranty'));
        }else{
            $('#infos-holder').html(setInfoHolder('warranty'));
        }
    }else{
        $('#infos-holder').html(setInfoHolder());
    }

    setWoSelect(partners);
});

function search(id, myArray){
    for (let i=0; i < myArray.length; i++) {
        if (myArray[i].id === id) {
            return myArray[i];
        }
    }
}

function setWoSelect(partners){
    $('#partners-list').html('');
    $('#partners-list').append('<option value="">Sélectionnez un service</option>');
    for(let p in partners){
        $('#partners-list').append('<option value="' + partners[p].id + '">' + partners[p].title + '</option>');
    }
}

function setInfoHolder(type){
    let html = '';
    switch(type){
        case 'warranty':
            html += '<div class="alert alert-success margin-top-10">';
            html += '<strong class="fa fa-check margin-right-10"></strong>';
            html += 'Ce bien est toujours sous garantie';
            html += '</div>';
            break;

        case 'no-warranty':
            html += '<div class="alert alert-danger margin-top-10">';
            html += '<strong class="fa fa-exclamation-triangle margin-right-10"></strong>';
            html += 'Ce bien n\'est plus sous garantie';
            html += '</div>';
            break;

        default:
            html += '<div class="alert alert-warning margin-top-10">';
            html += '<strong class="fa fa-exclamation-triangle margin-right-10"></strong>';
            html += 'Ce bien n\'a pas encore été réceptionné';
            html += '</div>';
    }
    return html;
}