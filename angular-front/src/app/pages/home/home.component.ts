import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { Hero } from 'src/app/shared/interfaces/heroes.interface';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CustomPaginator } from 'src/app/shared/material/configurations/curstomPaginatorConfig';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useValue: CustomPaginator() }],
})
export class HomeComponent implements OnInit {

  heroes$!: Observable<Hero[]>;
  deleteHeroId!: string;
  


  // Table
  displayedColumns: string[] = ['urlImage','name', 'speed', 'power','update','delete'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  modalDelete: boolean = false;
  modalHero!: Hero;

  constructor(private route: Router,private heroesService:HeroesService) { }

  ngOnInit(): void {
    this.getAllHeroes() 
  }  

  getAllHeroes(){
    this.heroesService.getAllHeroes().subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },error => this.route.navigate(['error']))
  }

  editHero(hero:Hero){
    this.route.navigateByUrl(`/newHero`,{ state: hero })
  }
  
  deleteHero(id:string){
    this.heroesService.deleteHero(id).subscribe(response => {
      this.getAllHeroes()
    },error => this.route.navigate(['error']))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(hero:Hero){
    this.modalHero = hero
    this.modalDelete = true
    
  }

  modalStatus(response:any){
    if(response.value){
      this.deleteHero(response.hero.id)
      this.modalDelete = false
    } else this.modalDelete = false
  }



}
