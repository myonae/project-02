/*imaginons 3 protagonistes, l'utilisateur de notre site (qui selectionne une section), le créateur du site (nous) et le NYTimes*/
$(document).ready(function() {

}); /*html est prêt pour commencer js*/
$('.nyt-list').change(function() { /*quand cette class a changé*/

    $(".articles").empty();
    $('.nyt-logo').css({ 'height': '7em' }); // changer la taille du logo quand une section est selectionnée
    $('header').css({ 'height': '200px' }) //chager la hauteur du header quand une secttion est sélectionnée
    $('.load-logo').css({ 'display': 'block' }); //change css pour faire apparaitre le logo de téléchargement 
    $('footer').fadeOut();
    $('.nyt-logo').fadeOut();
    $('.menu-nyt').fadeOut();
    $('.articles').fadeOut();

    var selectedvalue = $('.nyt-list option:selected').val(); /*représente une section sélectionnée par l'utilisateur*/
    selectedvalue += ".json";

    var url = "https://api.nytimes.com/svc/topstories/v2/"; /* la selection de la section ne suffit pas, il faut préciser au NYTimes l'url et l'extension (extension = valeurselectionné + ".json")*/
    url += selectedvalue;
    var arr = [""];
    url += '?' + $.param({
        'api-key': 'a8e74e0dd3b44d0595da9c06fedc4a13' /*'?'sépare l'url des options, tout le monde accède à la même info mais ils ne peuvent pas utiliser le meme code donc ça permet de donner un code unique et savoir qui on est là*/
    });
    $.ajax({
        url: url,
        /* on envoit l'url que nous avons rédiger ci-dessus*/
        method: 'GET',
        /* method qui envoie juste une url sans changement, n'importe qui peut voir votre API key donc pour être plus sécurisé il faut utiliser 'POST'*/
    }).done(function(result) { /* quand c'est fait, si ajax a réussi à avoir les doc demandé / result: l'infos obtenue du NYTimes*/
        /* accès à l'array entière*/

        $('.load-logo').fadeOut(2000, function() { //pour faire disparaitre le logo de léléchargement et faire apparaitre les articles et le reste de la page
            $('.nyt-logo').fadeIn();
            $('.menu-nyt').fadeIn();
            $('.articles').fadeIn();
            $('footer').fadeIn();
        });
        var result = result.results;
        /*console.log(result);*/
        /* results. results permet d'accéder directement à l'index appelé results*/
        /*var content = '';*/

        $.each(result.slice(0, 12), function(index, value) { /* index = 0 et value est toute la ligne (array) lié à cet index, donc dans les lignes suivantes on veut accéder aux values à l'intérieur de cette array, deeper and deeper*/



            if (value.multimedia.length > 0) {

                var abstract = value.abstract; /*dans l'array de l'index 0 (l'array) on veut accéder à l'abstract*/
                /*console.log(value.url);*/
                var url = value.url;
                var multimedia = value.multimedia[3].url;
                $('.articles').append('<a href= "' + url + '" class="link-articles"> <img src="' + multimedia + '" alt= "">' + '<p>' + abstract + '</p> </a>'); //ajouter cela à mon html

                /*content += '<a href= "' + url + '" class="link-articles"> <img src="' + multimedia + '" alt= "">' + '<p>' + abstract + '</p> </a>';*/
            }
        });
    }).fail(function(err) { /* dans le cas où on ne parvient pas à obtenir les infos demandées*/
        throw err;
    });

});