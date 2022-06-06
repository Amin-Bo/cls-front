import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoicesService } from 'src/app/services/invoices.service';



const ELEMENT_DATA: any[] = [];
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  displayedColumns: string[] = ['n','supplier', 'payment_method', 'payment_status','date','amount', 'details'];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);
  isLoadingResults = true;
  constructor(private invoicesService : InvoicesService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getAllInvoices();
   }

  getAllInvoices(){
    this.invoicesService.invoiceUpdateListener().subscribe(
      (res: Invoice[]) => {
        this.dataSource.data = res.map((invoice:Invoice, index : number) => {    
          return {
            n: index+1,
            _id : invoice._id,
            supplier: invoice.supplier,
            payment_method: invoice.payment_method,
            payment_status: invoice.payment_status.replace(/_/g, " "),
            date: invoice.date,
            amount : invoice.amount
            
          }
        });
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
      }
    );
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
