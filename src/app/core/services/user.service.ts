import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { UsuarioDtoResponse } from "../models/user/UsuarioDtoResponse";
import { UsuarioPerfilDtoResponse } from "../models/user/UsuarioPerfilDtoResponse";
import { PageResponse } from "../models/pagination/PageResponse";

@Injectable({
  providedIn: 'root',
})
export class UserService{
    
    private readonly apiUrl = `${environment.apiUrl}/user`;
    private httpClient = inject(HttpClient);

    getUserById(idUsuario: string): Observable<UsuarioDtoResponse>{
        return this.httpClient.get<UsuarioDtoResponse>(`${this.apiUrl}/${idUsuario}`);
    }

    getUserMe(): Observable<UsuarioDtoResponse>{
        return this.httpClient.get<UsuarioDtoResponse>(`${this.apiUrl}/me`);
    }
    

    getListFreindsByIdUser(idUsuario: string, page: number = 0, size: number = 9): Observable<PageResponse<UsuarioPerfilDtoResponse>>{
        return this.httpClient.get<PageResponse<UsuarioPerfilDtoResponse>>(`${this.apiUrl}/${idUsuario}/friends`, {
            params: {
                page: page.toString(),
                size: size.toString()
            }
        });
    }

    getListUserByUsername(username: string, page: number = 0, size: number = 9): Observable<PageResponse<UsuarioPerfilDtoResponse>>{
        return this.httpClient.get<PageResponse<UsuarioPerfilDtoResponse>>(`${this.apiUrl}/search/${username}`, {
            params: {
                page: page.toString(),
                size: size.toString()
            }
        });
    }
}