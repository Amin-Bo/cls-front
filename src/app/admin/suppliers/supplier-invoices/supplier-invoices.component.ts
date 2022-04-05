import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/models/invoice.model';
import { InvoicesTable } from 'src/app/models/tables.model';
import { InvoicesService } from 'src/app/services/invoices.service';
import { AddInvoiceComponent } from '../add-invoice/add-invoice.component';

const ELEMENT_DATA: InvoicesTable[] = [];

@Component({
  selector: 'app-supplier-invoices',
  templateUrl: './supplier-invoices.component.html',
  styleUrls: ['./supplier-invoices.component.css']
})
export class SupplierInvoicesComponent implements OnInit {

  displayedColumns: string[] = ['n', 'supplier', 'payment_method', 'payment_status', 'date', 'amount', 'details'];
  dataSource = new MatTableDataSource<InvoicesTable>(ELEMENT_DATA);
  isLoadingResults = true;
  constructor(private invoicesService: InvoicesService, private route: ActivatedRoute , private dialog:MatDialog) { }
  id : string;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.invoicesService.getInvoicesBySupplierId(params.id).subscribe(
        (res: Invoice[]) => { 
          this.dataSource.data = res.map((invoice: Invoice, index: number) => {

            return {
              n: index + 1,
              _id: invoice._id,
              supplier: invoice.supplier,
              payment_method: invoice.payment_method,
              payment_status: invoice.payment_status.replace(/_/g, " "),
              date: invoice.date,
              amount: invoice.amount

            }
          });
          this.isLoadingResults = false;
        },
        err => {
          console.log(err);
        }
      );
    }
    );
  }

  onAddInvoice(id : String){
    this.dialog.open(AddInvoiceComponent, {
      width: '700px',
      height : '50vh',
      data: {id : id}
    });

    //after closing dialog
    this.dialog.afterAllClosed.subscribe(() => {
      this.getInvoice();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
