import { Component, OnInit } from '@angular/core';
import { ClienteService } from './services/cliente.service';
import { Cliente } from './models/cliente';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  cliente = {} as Cliente;
  clientes = [] as Cliente[];

  constructor(private ClienteService: ClienteService) {}
  
  ngOnInit() {
    this.getclientes();
  }

  // define se um cliente será criado ou atualizado
  savecliente(form: NgForm) {
    if (this.cliente.id !== undefined) {
      this.ClienteService.updateCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.ClienteService.saveCliente(this.cliente).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os clientes
  getclientes() {
    this.ClienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  // deleta um cliente
  deletecliente(cliente: Cliente) {
    this.ClienteService.deleteCliente(cliente).subscribe(() => {
      this.getclientes();
    });
  }

  // copia o cliente para ser editado.
  editcliente(cliente: Cliente) {
    this.cliente = { ...cliente };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getclientes();
    form.resetForm();
    this.cliente = {} as Cliente;
  }

}