import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractsTable } from 'src/app/models/tables.model';
import { SuppliersService } from 'src/app/services/suppliers.service';
import { AddContractComponent } from '../add-contract/add-contract.component';

@Component({
  selector: 'app-supplier-contracts',
  templateUrl: './supplier-contracts.component.html',
  styleUrls: ['./supplier-contracts.component.css']
})
export class SupplierContractsComponent implements OnInit {
  ELEMENT_DATA: ContractsTable[] = [];
  displayedColumns: string[] = ['n', 'supplier', 'date_signature', 'expires_at', 'payment_status', 'details'];
  dataSource = new MatTableDataSource<ContractsTable>(this.ELEMENT_DATA);
  supplier_name : string;
  constructor(private route: ActivatedRoute, private suppliersService: SuppliersService , public dialog: MatDialog) { }
  id : String;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getContracts();

  }

  getContracts() {
    this.suppliersService.getContractBySupplierId(this.route.snapshot.params.id).subscribe((data: {contract : Contract[]}) => {
      this.id = this.route.snapshot.params.id;
      this.supplier_name = data.contract[0].supplier.name;
      this.dataSource.data = data.contract.map((contract: Contract, index: number) => {
        return {
          _id : contract._id,
          n: index + 1,
          supplier: contract.supplier,
          date_signature: contract.date_signature,
          expires_at: contract.expires_at,
          payment_status: contract.payment_status.replace(/_/g, " ")
        }

      });
    });

  }

  onAddContract(id : String){
    this.dialog.open(AddContractComponent, {
      width: '700px',
      height : '60vh',
      data: {id : id}
    });
    //on close dialog
    this.dialog.afterAllClosed.subscribe(() => {
      this.getContracts();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
