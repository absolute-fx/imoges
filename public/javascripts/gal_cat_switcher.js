let galLoaded = {};

$(document).ready(() =>{
    setCatButtons();
});

function setCatButtons(){
    //$('#cat-81').show();
    setMasonryGallery($(".masonry-gallery").first());
    galLoaded[$(".masonry-gallery").first().attr("id")] = true;
    $('.cat-btn').on('click', function(e){
        e.preventDefault();
        $('.cat-list li').removeClass('active');
        $(this).parent().addClass('active');
        $('.masonry-gallery').hide();
        let cat = $(this).data("cat");
        $('#' + cat).show();
        if(!galLoaded[cat]){
            setMasonryGallery($('#' + cat));
            galLoaded[cat] = true;
        }
    });
}
