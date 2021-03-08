const database = require('../db')
class AuthorController {
    create(request,response){
        const { name, email, telephone } = request.body 
        if (name && email &&  telephone){
            database('authors').insert({name, email, telephone}).then(id => { 
                response.json({message: "Autor criado com sucesso", id: id})
            }).catch(error => console.log(error))
        }
        else{
            response.status(400)
            response.json({ erro : "Nome, e-mail e telefone são obrigatórios!"} )
        }
       
    }
    index(request,response){
        database('authors').select().then(data => {
            response.json(data)
        }).catch(error => console.log(error))
    }
    find(request,response){
        const { id } = request.params
        if(id) {
            database('authors').where({id:id}).then(data => {
                if(data.length > 0 ){
                    response.json(data)
                }
                else {
                    response.status(400)
                    response.json("Autor não encontrado")
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
        const { name, email, telephone } = request.body
        if ( name && email &&  telephone ){
            database('authors').where({id:id}).update({name: name, email: email, telephone: telephone}).then(author => {
                if(author == 1){
                    database('authors').where({id:id}).then(data => {
                        if(data.length > 0 ){
                            response.json(data)
                        }
                        else {
                            response.status(400)
                            response.json("Autor não encontrado")
                        }
                    }).catch(error => console.log(error))
                }
            }).catch(error => console.log(error))
        }
        else{
                response.status(400)
                response.json({ erro : "Nome, email e telefone são obrigatórios!"} )
        }
    }
    delete(request, response){
        const { id } = request.params
        if(id) {
            database('authors').where('id',id).del().then(result =>{
                console.log(result)
                database.select().table('authors').then(data => {
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
module.exports = new AuthorController()