import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable(
  //  {providedIn: 'root'}
)
export class FileuploadService {

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: File): Observable<HttpEvent<any>> {
    // const url ='http://localhost:8081/api/file/SaveScriptFile';
    const url ='http://localhost:8081/FileUploadService/UploadFile';
    let formData = new FormData();
    formData.append('upload', file);
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    const req = new HttpRequest('POST', url, formData, options);
    return this.httpClient.request(req);
  }
}
