import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Supplier } from 'src/app/models/supplier.model';
import { SuppliersTable } from 'src/app/models/tables.model';
import { SuppliersService } from 'src/app/services/suppliers.service';

const ELEMENT_DATA: SuppliersTable[] = [];

@Component({
  selector: 'app-archived-suppliers',
  templateUrl: './archived-suppliers.component.html',
  styleUrls: ['./archived-suppliers.component.css']
})
export class ArchivedSuppliersComponent implements OnInit , AfterViewInit {

  displayedColumns: string[] = ['n','name', 'email', 'phone', 'address', 'contract_start_date','contract_end_date', 'all_contracts', 'all_invoices'];
  dataSource = new MatTableDataSource<SuppliersTable>(ELEMENT_DATA);

  constructor( private suppliersService : SuppliersService) { }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.suppliersService.getExpiredSuppliers().subscribe((res: Supplier[]) => {      
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
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
