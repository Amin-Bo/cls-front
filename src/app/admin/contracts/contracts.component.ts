import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Contract } from 'src/app/models/contract.model';
import { ContractsTable } from 'src/app/models/tables.model';
import { ContractsService } from 'src/app/services/contracts.service';




const ELEMENT_DATA: ContractsTable[] = [];
@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css']
})
export class ContractsComponent implements OnInit {

  displayedColumns: string[] = ['n','supplier', 'date_signature', 'expires_at', 'payment_status','details'];
  dataSource = new MatTableDataSource<ContractsTable>(ELEMENT_DATA);
  isLoadingResults = true;
  constructor(private contractsService : ContractsService) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  }

  ngOnInit(): void {
    this.getAllContracts();
   }

  getAllContracts(){
    this.contractsService.getAllContracts().subscribe(
      (res: Contract[]) => {
        this.dataSource.data = res.map((contract:Contract, index : number) => {
          return {
            n: index+1,
            _id : contract._id,
            supplier: contract.supplier,
            date_signature: contract.date_signature,
            expires_at: contract.expires_at,
            payment_status: contract.payment_status.replace(/_/g, " ")
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
