import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Collapse, 
  Nav, 
  Navbar, 
  NavbarBrand, 
  NavbarToggler, 
  NavItem, 
} from "reactstrap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="/">Cartão de Vacina</NavbarBrand>
        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="nav-link" to="/vacinas/cadastrar">
                Nova Vacina
              </Link>
            </NavItem>
            <NavItem>
              <Link className="nav-link" to="/vacinas/buscar">
                Buscar Vacinas
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}
