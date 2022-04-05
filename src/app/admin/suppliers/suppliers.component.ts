import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersTable } from 'src/app/models/tables.model';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { AddContractComponent } from './add-contract/add-contract.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';



const ELEMENT_DATA: SuppliersTable[] = [];

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['n','name', 'email', 'phone', 'address', 'contract_start_date','contract_end_date', 'all_contracts', 'all_invoices','actions'];
  dataSource = new MatTableDataSource<SuppliersTable>(ELEMENT_DATA);

  constructor( private suppliersService : SuppliersService , public dialog: MatDialog) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getSuppliers();
  }

  getSuppliers(){
    this.suppliersService.getSuppliers();
    this.suppliersService.suppliersUpdateListener().subscribe((res: Supplier[]) => {
      this.dataSource.data = res.map((supplier:Supplier, index:number) => {
        return {
          _id : supplier._id,
          n : index + 1,
          name: supplier.name,
          email: supplier.email,
          phone: supplier.phone,
          address: supplier.address,
          contract_start_date : supplier.contract_start_date,
          contract_end_date : supplier.contract_end_date
        }
      });
  });
  }
  

  showForm(){
    this.dialog.open(AddSupplierComponent,{
      width: '700px',
      height : 'auto',
    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getSuppliers();
    });
  }

  onAddContract(id : String){
    this.dialog.open(AddContractComponent, {
      width: '700px',
      height : '60vh',
      data: {id : id}
    });
  }
  onAddInvoice(id : String){
    this.dialog.open(AddInvoiceComponent, {
      width: '700px',
      height : '50vh',
      data: {id : id}
    });
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}

