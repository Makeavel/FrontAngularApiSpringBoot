
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:8080/api'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Contactros'"
  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.url + '/read/all')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Contactro pelo id
  getClienteById(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.url + '/read/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Contactro
  saveCliente(Cliente: Cliente): Observable<Cliente> {
    return this.httpClient.post<Cliente>(this.url + '/create/', JSON.stringify(Cliente), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um Contactro
  updateCliente(Cliente: Cliente): Observable<Cliente> {
    return this.httpClient.put<Cliente>(this.url + '/update/' + Cliente.id, JSON.stringify(Cliente), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um Contactro
  deleteCliente(Cliente: Cliente) {
    return this.httpClient.delete<Cliente>(this.url + '/delete/' + Cliente.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
