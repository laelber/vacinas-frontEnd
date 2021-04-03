import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';

import { Container, FormGroup, Input, Label, Button, Col, Row } from "reactstrap";

import api from '../../services/api'

export default function Vacina() {
  const params = useParams()
  const [vacina, setVacina] = useState({
    paciente_nome: '',
    paciente_cpf: '',
    vacina_nome: '',
    vacina_dosagem: '',
    vacina_numero_dose: '',
    aplicacao_data: '',
    aplicacao_local: ''
  })
  
  async function postVacinas() {
    try {
      const response = await api.post('/vacinas', vacina)

      if (response.status === 200) {
        alert('Vacina cadastrada com sucesso');
        setVacina({
          paciente_nome: '',
          paciente_cpf: '',
          vacina_nome: '',
          vacina_dosagem: '',
          vacina_numero_dose: '',
          aplicacao_data: '',
          aplicacao_local: ''
        })
      }
    } catch (error) {
      alert('Erro ao cadastrar vacina. Verifique os dados e tente novamente.');
    }
  }

  async function putVacinas() {
    try {
      const response = await api.put(`/vacinas/${params.id}`, vacina)

      if (response.status === 200) {
        alert('Vacina atualizada com sucesso');
      }
    } catch (error) {
      alert('Erro ao atualizar vacina. Verifique os dados e tente novamente.');
    }
  }

  async function getByIdVacina(){
    try {
      const response = await api.get(`/vacinas/${params.id}`)

      if (response.status === 200) {
        const { data } = response
        setVacina({
          id: data.id,
          paciente_nome: data.paciente_nome,
          paciente_cpf: data.paciente_cpf,
          vacina_nome: data.vacina_nome,
          vacina_dosagem: data.vacina_dosagem,
          aplicacao_data: format(new Date(data.aplicacao_data), "yyyy-MM-dd"),
          vacina_numero_dose: data.vacina_numero_dose,
          aplicacao_local: data.aplicacao_local
        })
      }
    } catch (error) {
      alert('Não foi possível carregar os dados da vacina. Verifique seu servidor!');
    }
  }

  useEffect(() => {
    if(params.id){
      getByIdVacina()
    } else {
      setVacina({
        paciente_nome: '',
        paciente_cpf: '',
        vacina_nome: '',
        vacina_dosagem: '',
        vacina_numero_dose: '',
        aplicacao_data: '',
        aplicacao_local: ''
      })
    }
  }, [params.id])

  function submit() {
    if(params.id){
      putVacinas();
    } else {
      postVacinas();
    }
  }
  
  return (
    <Container className="mt-5">
      <Row className="m-0 p-0">
        <Col md={4}>
          <FormGroup>
            <Label for="paciente_nome">Nome do Paciente</Label>
            <Input type="text" name="paciente_nome" 
            value={vacina.paciente_nome || ''}
            onChange={(e) => setVacina(old => ({...old, paciente_nome: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="paciente_cpf">CPF do Paciente</Label>
            <Input type="text" name="paciente_cpf"
            value={vacina.paciente_cpf || ''}
            onChange={(e) => setVacina(old => ({...old, paciente_cpf: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="vacina_nome">Nome da Vacina</Label>
            <Input type="text" name="vacina_nome"
            value={vacina.vacina_nome || ''}
            onChange={(e) => setVacina(old => ({...old, vacina_nome: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="vacina_dosagem">Dosagem da Vacina</Label>
            <Input type="number" step="0.1" min="0" name="vacina_dosagem"
            value={vacina.vacina_dosagem || ''}
            onChange={(e) => setVacina(old => ({...old, vacina_dosagem: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="vacina_numero_dose">Nº da Dose</Label>
            <Input type="number" step="1" min="0" name="vacina_numero_dose"
            value={vacina.vacina_numero_dose || ''}
            onChange={(e) => setVacina(old => ({...old, vacina_numero_dose: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="aplicacao_data">Data da Aplicação</Label>
            <Input type="date" name="aplicacao_data"
            value={vacina.aplicacao_data || ''}
            onChange={(e) => setVacina(old => ({...old, aplicacao_data: e.target.value}))} />
          </FormGroup>
        </Col>

        <Col md={4}>
          <FormGroup>
            <Label for="aplicacao_local">Local da Aplicação</Label>
            <Input type="text" name="aplicacao_local"
            value={vacina.aplicacao_local || ''}
            onChange={(e) => setVacina(old => ({...old, aplicacao_local: e.target.value}))} />
          </FormGroup>
        </Col>
      </Row>

      <Col md={4} className="ml-auto">
        <Button type="button" className="col-12" color="success"
        onClick={() => submit()}>
          {params.id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </Col>
    </Container>
  )
}
