import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-file',
  templateUrl: './show-file.component.html',
  styleUrls: ['./show-file.component.css']
})
export class ShowFileComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) { }

  path : string = "http://localhost:3000/assets/leaves/" + this.data.file;

  ngOnInit(): void {
    
  }

}
