// importaçõpes ultilizadas
import { useEffect, useState, useRef } from 'react'
import ImgDel from '../../assets/delete.png'
import './style.css'
import api from '../../services/api'

// função que injeta o html no rect
function Home() {

  //ferramenta do react para receber e realizar a autorização de exibir os novos usuarios na tela
  const [users, setUsers] = useState([])

  // ferramenta do react para receber valor dos inputs
  const inputNome   =  useRef()
  const inputIdade  =  useRef()
  const inputEmail  =  useRef()


  // exibir usuario do banco de dados na tela
async function getUsers() {

    const userFromApi = await api.get('/users')
     setUsers(userFromApi.data) 
  }

// ferramenta para recarregar a pagina (estrutura para não chamar a função avulsa)
useEffect(() => {
  getUsers()
}, []) 

  //função de deltetar usuarios
async function deletUsers(id){
 await api.delete(`/users/${id}`)

 getUsers()
}

  //criar um novo usuario no banco de dados
async function postUsers(){
  await api.post('/users',{
    name: inputNome.current.value,
    age: inputIdade.current.value,
    email:inputEmail.current.value
  })
  getUsers()
}


// estrutura HTML do código
  return (
    <div className='container'>
      <h1>Cadastro De Usuário</h1>
      <form >
        <input placeholder='Nome' type="text" id=""  ref={inputNome}/>
        <input placeholder='Idade' type="number" id="" ref={inputIdade} />
        <input placeholder='E-mail' type="email" id="" ref={inputEmail} />
        <button type="button" onClick={postUsers}>Cadastrar</button>
      </form>

      {users.map((user) => (
      <div className='cardUsuarios' key={user.id}>
        <div>
          <p> <span>Nome:</span> {user.name}</p>
          <p> <span>Idade:</span> {user.age}</p>
          <p> <span>Email:</span> {user.email}</p>
        </div>
        <button className='btn_del' onClick={() => deletUsers(user.id)}>
          <img src={ImgDel} />
        </button>
      </div>

      ))}

    </div>

  )
}

export default Home
