import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.interface';
import { ServerResponse } from '../models/server-response.interface';

@Injectable({
  providedIn: 'root'
})
export class FileApiService {
  private baseUrl = 'https://localhost:44397/api/File';

  constructor(private httpClient: HttpClient) {}

  getAllItemsInfoData(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.baseUrl}/GetAllItemsInfoData`);
  }

  uploadFile(formData: FormData): Observable<ServerResponse> {
    return this.httpClient.post<ServerResponse>(`${this.baseUrl}/Upload`, formData);
  }
}
