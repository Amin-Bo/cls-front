import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-document',
  templateUrl: './show-document.component.html',
  styleUrls: ['./show-document.component.css']
})
export class ShowDocumentComponent implements OnInit {
  path : string = "http://cls-rest.herokuapp.com/assets/certifications/" + this.data.file;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) { }

  ngOnInit(): void {
  }

}
