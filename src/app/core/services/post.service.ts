import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";
import { PublicacionDtoResponse } from "../models/post/PublicacionDtoResponse";
import { PageResponse } from "../models/pagination/PageResponse";
import { PublicacionDtoRequest } from "../models/post/PublicacionDtoRequest";
import { ComentarioDtoResponse } from "../models/comment/ComentarioDtoResponse";
@Injectable({
  providedIn: 'root',
})
export class PostService {
    private readonly apiUrl = `${environment.apiUrl}/posts`;
    
    constructor(
        private httpClient: HttpClient
    ){}

    listPosts(page: number = 0,size: number = 10, sort: string = 'fechaPublicacion,desc'):Observable<PageResponse<PublicacionDtoResponse>> {

        const params = new HttpParams()
        .set('page', page)
        .set('size', size)
        .set('sort', sort);

        return this.httpClient.get<PageResponse<PublicacionDtoResponse>>(this.apiUrl,{ params });
    }

    newPost(publicacion: PublicacionDtoRequest, imagenes: File[]): Observable<PublicacionDtoResponse> {
        const formData = new FormData();
        
        formData.append('publicacionDtoRequest',new Blob(
            [JSON.stringify(publicacion)],
            { type: 'application/json' }
        ));
        
        if (imagenes.length) {
            imagenes.forEach(imagen => {
                formData.append('multipartFile', imagen);
            });
        }

        return this.httpClient.post<PublicacionDtoResponse>(this.apiUrl, formData);
    }
    
    getPostById(idPublicacion: string): Observable<PublicacionDtoResponse>{
        return this.httpClient.get<PublicacionDtoResponse>(`${this.apiUrl}/${idPublicacion}`);
    }

    getCommentsPostById(idPublicacion: string): Observable<PageResponse<ComentarioDtoResponse>>{
        return this.httpClient.get<PageResponse<ComentarioDtoResponse>>(`${this.apiUrl}/${idPublicacion}/comments`);
    }

}