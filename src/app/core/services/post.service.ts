import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { Observable } from "rxjs";
import { PublicacionDtoResponse } from "../models/post/PublicacionDtoResponse";
import { PageResponse } from "../models/pagination/PageResponse";
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

    return this.httpClient.get<PageResponse<PublicacionDtoResponse>>(
        this.apiUrl,
        { params }
       
    );
}

}