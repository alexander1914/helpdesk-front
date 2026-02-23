import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  findByIdCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${API_CONFIG.baseUrl}/clientes`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${API_CONFIG.baseUrl}/clientes${cliente.id}`, cliente);
  }

  deleteCliente(id: Cliente): Observable<Cliente> {
    return this.http.delete<Cliente>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }
}
