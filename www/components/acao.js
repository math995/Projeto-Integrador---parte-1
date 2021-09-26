var url = 'http://integrador.profrodolfo.com.br/';

$(document).on('submit','#cadastroNivel', function(e){
    $.ajax({
        url: url+'niveis.php',
        data: $(this).serialize(),
        type: 'POST',
        success: function (retorno){
            $('#nome').val("");
            $('#saida').html(retorno);
            //atualiza a lista com o novo cadastro
            ListaNivel();
        }
    });
    
    //previne que o usuário seja redirecionado (envia os dados em sair)
    e.preventDefault();
});

ListaNivel();

function ListaNivel(){
    $.ajax({
       url: url+'niveis.php?list',
       type:'GET',
       success: function(retorno){
           var res = JSON.parse(retorno);
           $('#listaNivel').html("");
           for(i=0;i<res.length;i++){
               $('#listaNivel').append('<li>'+res[i].nome+' <span class="excluir" id="'+res[i].cd+'"> | Excluir</span> </li>');
           }
       }
    });
}
function ListaOptionNivel(){
    $.ajax({
       url: url+'niveis.php?list',
       type:'GET',
       success: function(retorno){
           var res = JSON.parse(retorno);
           $('#nivel').html("");
           for(i=0;i<res.length;i++){
               $('#nivel').append('<option value="'+res[i].cd+'">'+res[i].nome+'</option>');
           }
       }
    });
}

$(document).on('click','.excluir',function(){
    var id = $(this).attr('id');
    $.ajax({
      url: url+'niveis.php',
      data:{'id': id},
      type: 'GET',
      success: function(retorno){        
        $('#saida').html(retorno);
        ListaNivel();
      }
    });
});

$(document).on('submit', '#user', function(e){
$.ajax({
    url: url+'usuario.php',
    data: $(this).serialize(),
    type: 'POST',
    success: function(retorno){
        $('#display').html(retorno);
        ListaNivel();
    }

});
    e.preventDefault();
});
$(document).ready(function(){
    ListaOptionNivel();
});
