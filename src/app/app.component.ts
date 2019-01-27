import { Component } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileuploadService } from './fileupload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'FileUploadDemo';
  isNewFile = true;
  isUploaded = false;
  progressPercentage = 0;
  isUploadingDone = false;

  fileList: FileList;
  private name: string;

  constructor(
    private fileuploadService: FileuploadService
  ) { }

  fileChange(event: any): void {
    if ((event.target.files[0] / 1048576) > 10) {
      this.isUploaded = false;
      // this.toastr.error('Cannot upload, File size is more then 10mb', `Error`);
    }

    this.isUploaded = false;
    this.isNewFile = true;
    this.fileList = event.target.files;
    this.progressPercentage = 0;
  }

  async uploadFile() {
    this.isUploaded = true;
    this.name = this.fileList[0].name;
    this.isNewFile = false;

    try {
      const event = await this.fileuploadService.uploadFile(this.fileList[0]).toPromise();
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File is ${percentDone}% loaded.`);
        this.progressPercentage = percentDone;
      } else if (event instanceof HttpResponse) {
        this.progressPercentage = 100;
      }
    } catch (ex) {
      console.log('Upload Error:', ex);
    }
    this.progressPercentage = 100;
    console.log('Upload done');
  }
}
