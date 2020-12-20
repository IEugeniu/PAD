import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {MatSnackBar} from '@angular/material/snack-bar'
import { MatPaginator } from '@angular/material/paginator';
import { SongDto } from './models/SongDto';
import { SongService } from './services/song.service';
import { AddSongComponent } from './add-song/add-song.component';
import { EditSongComponent } from './edit-song/edit-song.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  songs: SongDto[] = null;

  constructor(private service: SongService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.service.listen().subscribe((m: any) => {
      this.refreshSongList();
    })
   }

  displayedColumns: string[] = ['artist', 'name', 'year', 'modify'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshSongList();
  }

  refreshSongList() {
    this.service.getSongs().subscribe(data => {
      this.songs = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    dialogConfig.height = "35%";
    dialogConfig.backdropClass = "backdropBackground";
    this.dialog.open(AddSongComponent, dialogConfig);
  }

  onEdit(id: string, song: SongDto) {
    this.service.formData = song;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "20%";
    dialogConfig.height = "35%";
    dialogConfig.data = id;
    dialogConfig.backdropClass = "backdropBackground";
    this.dialog.open(EditSongComponent, dialogConfig);
  }

  onDelete(id: string) {
    if(confirm('Delete the song?')){
      this.service.deleteSong(id).subscribe(res => {
        this.refreshSongList();
        this.snackBar.open("Item deleted", '', {
          duration: 3000,
          verticalPosition: 'top'
        });
      });
    }
  }

  applyFilter(filter: string) {
    this.dataSource.filter=filter.trim().toLocaleLowerCase();
  }
}
