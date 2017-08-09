import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'upload',
  templateUrl: 'upload.html',
  styleUrls: ['upload.css'],
  providers: [FormBuilder]
})

/*
Added some console logs to understand and debug...

*/
export class UploadComponent implements OnInit {

  filesToUpload: Array<File> = [];
  
  @ViewChild('myinput') input: ElementRef;
 
  advancedUpload: boolean;

  @Input()
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    //example
    /*
    this.form = this.fb.group({
      'comment': new FormControl('')
    });
    */
  }

  ngOnInit(): void {
    this.advancedUpload = this.isAdvancedUpload();
    console.log('advancedUpload', this.advancedUpload);
  }

  ngOnChange(): void {
    console.log('ngOnChange');
    //console.log(this.filesToUpload.length);
  }

  onSubmit(form: any) {
    //console.log(form);
  }

  fileChangeEvent(event: any) {
    if (this.filesToUpload) {
      var newFiles = <Array<File>>event.target.files;
      for (var i = 0; i < newFiles.length; ++i) {
        this.filesToUpload.push(newFiles[i]);
      }
    }
    else {
      this.filesToUpload = <Array<File>>event.target.files;
    }
    this.input.nativeElement.value = null;
    //console.log(this.filesToUpload.length);
  }

  removeFile(file: any) {
    if (this.filesToUpload) {
      var index = this.filesToUpload.indexOf(file, 0);
      if (index > -1) {
        this.filesToUpload.splice(index, 1);
      }
    }
    //console.log(this.filesToUpload.length);
  }

  private isAdvancedUpload() {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
  }

  /*
  onDragStart(event) {
    console.log('onDragStart')
    event.preventDefault();
    event.stopPropagation();
  }
  */

  onDrop(event) {
    console.log('onDrop')
    console.log(event.dataTransfer.files)

    if (event.dataTransfer.files.length > 0) {
      if (this.filesToUpload) {
        var newFiles = <Array<File>>event.dataTransfer.files;
        for (var i = 0; i < newFiles.length; ++i) {
          this.filesToUpload.push(newFiles[i]);
        }
      }
      else {
        this.filesToUpload = <Array<File>>event.dataTransfer.files;
      }
    }

    event.target.classList.remove('is-dragover');

    event.preventDefault();
    event.stopPropagation();
  }

  onDragOver(event) {
    console.log('onDragOver');
    event.target.classList.add('is-dragover');
    event.preventDefault();
    event.stopPropagation();
  }
  
  onDragEnter(event) {
    console.log('onDragEnter')
    event.target.classList.add('is-dragover');
    event.preventDefault();
    event.stopPropagation();
  }
  
  onDragLeave(event) {
    console.log('onDragLeave')
    event.target.classList.remove('is-dragover');
    event.preventDefault();
    event.stopPropagation();
  }

}
