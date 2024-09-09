export default class APIService {
  static UpdateArticle(id, data) {
    return fetch(`http://127.0.0.1:5000/update/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json());
}


    static insertArticle(body){
        return  fetch(`http://127.0.0.1:5000/add`,{
            'method':'POST',
            headers:{
              'Content-type':'application/json'
            },
            body:JSON.stringify(body)
           })
           .then(resp=>resp.json())
    }
    static DeleteArticle(id){
        return  fetch(`http://127.0.0.1:5000/delete/${id}/`,{
            'method':'DELETE',
            headers:{
              'Content-type':'application/json'
            },
           
           })
          
    }
}
