import { inject, Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { ComentarioDtoResponse } from "../models/comment/ComentarioDtoResponse";
import { Observable } from "rxjs";
import { ComentarioDtoRequest } from "../models/comment/ComentarioDtoRequest";
@Injectable({
  providedIn: 'root'
})
export class CommentService {
    private readonly apiUrl = `${environment.apiUrl}/comment`;

    private httpClient = inject(HttpClient);

    newComment(comentario: ComentarioDtoRequest): Observable<ComentarioDtoResponse> {
        return this.httpClient.post<ComentarioDtoResponse>(this.apiUrl, comentario);
    }
}