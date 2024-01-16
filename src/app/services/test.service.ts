import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  changeEmail(data: any): Observable<any> {
    const apiUrl = this.configService.getApiUrl();
    const bearerToken = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhbmRlcnNvbkBnbWFpbC5jb20iLCJpZCI6MTksImlhdCI6MTcwNTMyODU3OCwiZXhwIjoxNzA1OTMzMzc4fQ.FxSyC5P2idSf8bu7_IzzQ5UlfF6p_z7XIaGckX6R2ZZQiGg7Z5SKna5nRuWj0NIe';

    // Configura el encabezado de autorización con el token de portador y el tipo de contenido
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/json'
    });
    console.log(data)

    // Realiza la solicitud POST con el cuerpo (data) y los encabezados
    return this.http.put(`${apiUrl}user/1/changeEmail`, data, { headers });
  }
}
