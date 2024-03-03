import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FileApiService } from './services/file-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  public data: any = [];
  public chartOptions: any;
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef;
  
  constructor(private _toastrService: ToastrService, 
    private _fileApiService: FileApiService){ }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.chartOptions = {
      data: []
    };
    this._fileApiService.getAllItemsInfoData()
    .subscribe((response: any) => {
      if(response.success) {
        this.data = response.data.map((item : any) => ({
          label: item.label,
          y: item.number,
          color: item.color
        }));
      }
      this.chartOptions = {
        title: {
          text: "Task 1"
        },
        animationEnabled: true,
        axisY: {
        includeZero: true,
        suffix: "K"
      },
        data: [{
          type: "bar",
          indexLabel: "{y}",
          yValueFormatString: "#,###K",
          dataPoints: this.data 
        }]
      };
    }, (error : any) => {
      this._toastrService.error('Failed getting data', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }



  uploadFile(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this._fileApiService.uploadFile(formData)
      .subscribe((response: any) => {  
        if(response.success){
          this._toastrService.info(`${response.message}`, '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          this.loadData();
          this.selectedFile = null;
          this.resetFileInput();
        } else {
          this._toastrService.error(`${response.message}`, 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
        }
      }, (error : any) => {
        this._toastrService.error('Error', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      });
    } else {
      this._toastrService.info('Please choose .txt file', '', { timeOut: 3000, positionClass: 'toast-bottom-right' });
    }
  }


  resetFileInput(): void {
    this.fileInput.nativeElement.value = '';
  }
}
