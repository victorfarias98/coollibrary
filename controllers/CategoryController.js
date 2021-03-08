const database = require('../db')
class CategoryController {
  
    create(request,response){
        const { title, status } = request.body 
        if ( title && status ){
            database('categories').insert({title,status}).then(id => { 
                response.json({message: "Categoria criada com sucesso", id: id})
            }).catch(error => console.log(error))
        }
        else{
            response.status(400)
            response.json({ erro : "Título e status são obrigatórios!"} )
        }
       
    }
    index(request,response){
        database('categories').select().then(data => {
            response.json(data)
        }).catch(error => console.log(error))
    }
    find(request,response){
        const { id } = request.params
        if(id) {
            database('categories').where({id:id}).then(data => {
                if(data.length > 0 ){
                    response.json(data)
                }
                else {
                    response.status(400)
                    response.json("Categoria não encontrada")
                }
            }).catch(error => console.log(error))
        }
        else{
            response.status(400)
            response.json({ erro : "Digite um id válido"} )
        }
    }
    update(request,response){
        const { id } = request.params
        const { title , status } = request.body
        if ( title && status ){
            database('categories').where({id:id}).update({title: title, status: status}).then(category => {
                if(category == 1){
                    database('categories').where({id:id}).then(data => {
                        if(data.length > 0 ){
                            response.json(data)
                        }
                        else {
                            response.status(400)
                            response.json("Categoria não encontrada")
                        }
                    }).catch(error => console.log(error))
                }
            }).catch(error => console.log(error))
        }
        else{
                response.status(400)
                response.json({ erro : "Titulo e status são obrigatórios!"} )
        }
    }
    delete(request, response){
        const { id } = request.params
        if(id) {
            database('categories').where('id',id).del().then(result =>{
                console.log(result)
                database.select().table('categories').then(data => {
                    response.json(data)
                }).catch(error => console.log(error))
                
            }).catch( error => console.log(error))
        }
        else{
            response.status(400)
            response.json({ erro : "Digite um id válido"} )
        }
        
    }
}
module.exports = new CategoryController()