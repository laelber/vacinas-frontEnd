import { useEffect, useState } from 'react'
import { format } from 'date-fns';
import { FaTrash, FaEdit } from 'react-icons/fa'
import { Container, Table, Button } from 'reactstrap'

import api from '../../services/api';
import history from '../../services/history';

import SafeModal from '../../components/SafeModal';

export default function ListaVacinas() {
  const [open, setOpen] = useState(false)
  const [vacinas, setVacinas] = useState([])

  async function getAllVacinas() {
    try {
      const response = await api.get('/vacinas');

      
      if(response.status === 200){
        setVacinas(response.data);
      }
    } catch (error) {
      setVacinas([]);
    }
  }


  async function deleteVacina(id) {
    try {
      const response = await api.delete(`/vacinas/${id}`);
      if(response.status === 200){
        alert('Vacina excluída com sucesso!')
        getAllVacinas()
      }
    } catch (error) {
      alert('Erro ao excluir vacina. Verifique seu servidor!')
    }
    setOpen(!open)
  }
  

  useEffect(() => {
    getAllVacinas();
  }, [])
  
  return (
    <Container className="mt-5">
      <Table bordered hover responsive striped>
        <thead>
          <tr>
            <th>CPF</th>
            <th>Nome</th>
            <th>Data Aplicação</th>
            <th>Vacina</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {vacinas.length > 0 && vacinas.map(vacina =>
            <tr key={vacina.id}>
              <th scope="row">{vacina.paciente_cpf}</th>
              <td>{vacina.paciente_nome}</td>
              <td>{format(new Date(vacina.aplicacao_data), "dd/MM/yyyy")}</td>
              <td>{vacina.vacina_nome}</td>
              <td>
                <Button type="button" size="sm" className="mr-2" color="danger"
                onClick={() => setOpen(true)}>
                  <FaTrash/>
                </Button>

                <Button type="button" size="sm" color="success" 
                onClick={() => history.push(`/vacinas/editar/${vacina.id}`)}>
                  <FaEdit/>

                <SafeModal 
                  open={open}
                  toggle={() => setOpen(!open)}
                  title="Deseja excluir a vacina?"
                  msg="Essa ação impactará em todo o sistema, pois uma vez excluída não pode ser recuperada."
                  fAccept={() => deleteVacina(vacina.id)}/>
                </Button>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  )
}
