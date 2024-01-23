import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {BlogApiService} from "../../services/blog.api-service";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import {ConfirmActionsDialogComponent} from "../confirm-actions-dialog/confirm-actions-dialog.component";
import {LoginDataService} from "../../services/comunication/login/login-data.service";
interface BlogManageableModel {
  id: number;
  authorFullName: string;
  label: string;
  imageUrl: string;
  title: string;
  description: string;
  content: string;
  publishDate: number;
}
@Component({
  selector: 'app-manage-blogs',
  templateUrl: './manage-blogs.component.html',
  styleUrls: ['./manage-blogs.component.css'],
})
export class ManageBlogsComponent implements OnInit  {
  token=""
  columnsDefinitions = [
    { column: 'imageUrl', isHidden: false },
    { column: 'title', isHidden: false },
    { column: 'label', isHidden: false },
    { column: 'publishDate', isHidden: false },
    { column: 'action', isHidden: false }
  ];
  displayableColumns: string[] = [];


  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private breakpointObserver: BreakpointObserver,private loginDataService: LoginDataService,public dialog: MatDialog,private toast: NgToastService,private crypto: CryptoData,private router: Router,private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
    this.GetAllBlogs()
    this.getDisplayedColumns()
    this.breakpointObserver.observe([
      '(max-width: 1074px)',
    ]).subscribe(result => {
      const imageUrlColumn = this.columnsDefinitions.find(cd => cd.column === 'imageUrl');
      if (imageUrlColumn) {
        if (result.matches) {
          imageUrlColumn.isHidden = true;
        } else {
          imageUrlColumn.isHidden = false;
        }
      }

      this.displayableColumns = this.columnsDefinitions
        .filter(cd => !cd.isHidden)
        .map(cd => cd.column);
    });
    this.breakpointObserver.observe([
      '(max-width: 810px)',
    ]).subscribe(result => {
      const imageUrlColumn = this.columnsDefinitions.find(cd => cd.column === 'label');
      if (imageUrlColumn) {
        if (result.matches) {
          imageUrlColumn.isHidden = true;
        } else {
          imageUrlColumn.isHidden = false;
        }
      }

      this.displayableColumns = this.columnsDefinitions
        .filter(cd => !cd.isHidden)
        .map(cd => cd.column);
    });
    this.breakpointObserver.observe([
      '(max-width: 501px)',
    ]).subscribe(result => {
      const imageUrlColumn = this.columnsDefinitions.find(cd => cd.column === 'publishDate');
      if (imageUrlColumn) {
        if (result.matches) {
          imageUrlColumn.isHidden = true;
        } else {
          imageUrlColumn.isHidden = false;
        }
      }

      this.displayableColumns = this.columnsDefinitions
        .filter(cd => !cd.isHidden)
        .map(cd => cd.column);
    });
  }
  GetAllBlogs() {
    new BlogApiService().getAllManageableBlogs().then(response=>{
      this.empdata = response.data;

      this.dataSource = new MatTableDataSource<BlogManageableModel>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getDisplayedColumns() {
    this.displayableColumns = this.columnsDefinitions
      .filter(cd => !cd.isHidden)
      .map(cd => cd.column);
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {

  }
  getDisplayableDate(date: number): string {
    const publishDate = new Date(date);

    const day = String(publishDate.getDate()).padStart(2, '0');
    const month = String(publishDate.getMonth() + 1).padStart(2, '0');
    const year = publishDate.getFullYear();

    return `${day}-${month}-${year}`;
  }


  viewBlog(blogId: number) {
    let encrypted = this.crypto.encryptPageId(blogId.toString());
    this.router.navigate(['/blog/' + encodeURIComponent(encrypted)]);
  }
  getIndexByBlogId(blogId: number): number {
    const index = this.empdata.findIndex((blog: { id: number; }) => blog.id === blogId);
    return index;
  }
  showDeleteBlogDialog(blogId: number,enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef =this.dialog.open(ConfirmActionsDialogComponent, {
      width: '570px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {itemId: blogId, request: "confirm-delete-blog",mainVisibleName: this.empdata[this.getIndexByBlogId(blogId)].title},

    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.empdata = this.empdata.filter((blog: { id: number; }) => blog.id !== blogId);

        this.dataSource = new MatTableDataSource<BlogManageableModel>(this.empdata);
        this.toast.success({ detail: "Blog eliminado", summary: 'Blog eliminado correctamente', duration: 3000 });
      }
    });
  }

  addNewBlog() {
    this.router.navigate(['/create-blog']);
  }


}
