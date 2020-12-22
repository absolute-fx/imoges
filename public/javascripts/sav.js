$('document').ready(function(){
    //console.log(realties)
    $('.cat-list a').click(function(e){
        getCategory($(this).data('id'));
    });
    setFormVisibility();
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
    console.log(partners)
    $('#partners-list').html('');
    $('#partners-list').append('<option value="" data-active="0">Sélectionnez une catégorie</option>');
    for(let p in partners){
        $('#partners-list').append('<option value="' + partners[p].id + '" data-active="' + partners[p].active + '">' + partners[p].title + '</option>');
    }
    setFormVisibility();
}

function setFormVisibility(){
    $('#partners-list').change(function(e){
        if($(this).find(':selected').data('active')){
            $('#form-container').fadeIn();
            $('#partnerInfos').html('');
        }else{
            $('#form-container').fadeOut();
            // load partner info

            const uid = $(this).find(':selected').data('uid');
            if(uid) {
                $.ajax({
                    method: "GET",
                    url: "http://127.0.0.1:4000/api/partner/" + uid
                })
                    .done(function (partnerInfo) {
                        let msg = "<p>Pour ce type d'intervention, veuillez directement contacter la société <strong>" + partnerInfo.user.company_name + "</strong> via les coordonnées ci-dessous:</p>";
                        if (partnerInfo.user.email) msg += "Mail: <strong>" + partnerInfo.user.email + "</strong><br>";
                        if (partnerInfo.user.mobile) msg += "Mobile 1: <strong>" + partnerInfo.user.mobile + "</strong><br>";
                        if (partnerInfo.user.mobile2) msg += "Mobile 2: <strong>" + partnerInfo.user.mobile2 + "</strong><br>";
                        if (partnerInfo.user.phone) msg += "Téléphone: <strong>" + partnerInfo.user.phone + "</strong><br>";
                        $('#partnerInfos').html(msg);
                    });
            }else{
                $('#partnerInfos').html('');
            }
        }
    });
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
            html += 'Ce bien n\'est plus sous garantie. Des frais d\'intervention pourraient être à votre charge.';
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

function getCategory(id){
    $.get('/supportcategories/' + id, function(data){
        console.log(data);
        let root = data.category.root;
        $('#faq-list').html('');
        data.category.faqs.forEach(faq =>{
            console.log(faq);
            let htmlElement = '<div class="toggle">';
            htmlElement += '<label>' + faq.title + '</label>';
            htmlElement += '<div class="toggle-content">';
            htmlElement += faq.description;
            htmlElement += getLibraries(root, faq);
            htmlElement += '</div></div>';
            $('#faq-list').append(htmlElement);
        });
        _toggle();
        _lightbox();
    })
}

function getLibraries(root, faq){
    let videos = '';
    let documents = '';
    let images = '';

    faq.librarycategories.forEach(category =>{
        switch(category.library_category_label){
            case 'video':
                category.libraries.forEach(library =>{
                    videos += setVideo(library.library_media_url);
                });
                break;
            case 'document':
                documents += '<div class="button-container">';
                category.libraries.forEach(library =>{
                    documents += setDocuments(library.library_media_name, faq.id, root);
                });
                documents += '</div>';
                break;
            case 'image' :
                images += setImages(category.libraries, faq.id);
                break;
        }
    });
    return videos + images + documents;
}

function setVideo(link){
    let video = '<div class="embed-responsive embed-responsive-16by9 margin-bottom-20">';
    video += '<iframe class="embed-responsive-item" width="560" height="315" src="'+ link +'"></iframe>';
    video += '</div>';
    return video;
}

function setImages(libraries, faqId){
    let images = '';
    let col = '';
    if(libraries.length > 4){
        col += 'col-md-3';
    }else{
        if(libraries.length === 1) col += 'col-md-12';
        if(libraries.length === 2) col += 'col-md-6';
        if(libraries.length === 3) col += 'col-md-4 col-sm-6';
        if(libraries.length === 4) col += 'col-md-3 col-sm-6';
    }
    images += '<div class="row margin-bottom-20">';
    libraries.forEach(library =>{
        images += '<div class="' + col + '">';
        images += '<a href="../faqs_libraries/' + faqId + '/fhd_' + library.library_media_name + '" class="item-image lightbox" data-plugin-options="{"type":"image"}">';
        images += '<img class="img-responsive" src="../faqs_libraries/' + faqId + '/thumb_' + library.library_media_name + '">';
        images += '</a>';
        images += '</div>';
    });
    images += '</div>';

    return images
}

function setDocuments(file, faqId, root){
    let document = '';
    document += '<a href="' + root + '/faqs_libraries/' + faqId + '/' + file + '" target="_blank" class="btn btn-featured btn-info">';
    document += '<span>' + file + '</span>';
    document += '<i class="fa fa-file-pdf-o"></i>';
    document += '</a>';
    return document
}

$('#search-faqs').submit(function(e){
    let terms = $('#terms').val();
    if(terms !== ''){
        $.post('/faqs', {terms:terms},function(data){
            let root = data.root;
            $('#faq-list').html('');
            data.faqs.forEach(faq =>{
                //console.log(faq);
                let htmlElement = '<div class="toggle">';
                htmlElement += '<label>' + faq.title + '</label>';
                htmlElement += '<div class="toggle-content">';
                htmlElement += faq.description;
                htmlElement += getLibraries(root, faq);
                htmlElement += '</div></div>';
                $('#faq-list').append(htmlElement)
            });
            _toggle();
            _lightbox();
        });
    }
    return false
});