import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import {BlogApiService} from "../../services/blog.api-service";
import {CryptoData} from "../../services/CryptoJs/crypto-data";
import {ActivatedRoute, Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
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
  displayedColumns: string[] = ['imageUrl','title', 'label',  'publishDate', 'action'];
  dataSource: any;
  empdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  isBlogDeleteInProcess= false;

  constructor(private toast: NgToastService,private crypto: CryptoData,private router: Router,private route: ActivatedRoute) {}


  ngOnInit(): void {
    this.token=this.crypto.getDecryptObjectFromStorage().sessionToken
    this.GetAllBlogs()
  }
  GetAllBlogs() {
    new BlogApiService().getAllManageableBlogs().then(response=>{
      this.empdata = response.data;

      this.dataSource = new MatTableDataSource<BlogManageableModel>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
    //console.log(row);
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

  deleteBlog(blogId: number) {
    this.isBlogDeleteInProcess=true
    new BlogApiService().deleteBlog(this.token,blogId).then(response=>{
      this.empdata = this.empdata.filter((blog: { id: number; }) => blog.id !== blogId);

      this.dataSource = new MatTableDataSource<BlogManageableModel>(this.empdata);
      this.isBlogDeleteInProcess=false

      this.toast.success({ detail: "Blog eliminado", summary: 'Blog eliminado correctamente', duration: 3000 });

    })
  }

  addNewBlog() {
    this.router.navigate(['/create-blog']);

  }
}
