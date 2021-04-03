import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function SafeModal({ open, toggle, title, msg, fAccept }) {  
  return (
    <div>
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {msg}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
          <Button color="danger" onClick={fAccept}>Confirmar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
