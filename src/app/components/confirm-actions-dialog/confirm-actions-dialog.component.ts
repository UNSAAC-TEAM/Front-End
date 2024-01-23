import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BlogApiService} from "../../services/blog.api-service";
import {MatTableDataSource} from "@angular/material/table";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import {DialogDataModel} from "../../core/models/DialogDataModel";
import {RegisterComponent} from "../authentication/register/register.component";

@Component({
  selector: 'app-confirm-actions-dialog',
  templateUrl: './confirm-actions-dialog.component.html',
  styleUrls: ['./confirm-actions-dialog.component.css']
})
export class ConfirmActionsDialogComponent implements OnInit {
  token=this.crypto.getDecryptObjectFromStorage().sessionToken
  header=""
  message=""
  mainVisibleName=""
  constructor(public dialogRef: MatDialogRef<ConfirmActionsDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogDataModel,private crypto: CryptoData,private dialog: MatDialog,) { }

  ngOnInit(): void {
    if(this.data.request=="confirm-delete-blog"){
      this.header="¿Estas seguro?"
      this.message="Si eliminas este blog no podras recuperarlo"
    }

  }
  deleteBlog() {
    new BlogApiService().deleteBlog(this.token,this.data.itemId).then(response=>{
      this.dialogRef.close(true);
    })
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
}
