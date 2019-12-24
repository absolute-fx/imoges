$('document').ready(function(){
    //console.log(realties)
});

$('#realties-list').change(function(){
    const id = $(this).val();
    const partners = search(parseInt(id), realties).partners;
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
    $('#partners-list').append('<option value="0">Autre</option>');
}