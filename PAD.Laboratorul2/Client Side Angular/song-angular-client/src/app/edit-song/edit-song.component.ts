import { Inject, Optional } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-edit-song',
  templateUrl: './edit-song.component.html',
  styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

  public songForm: FormGroup;

  constructor(public dialogbox: MatDialogRef<EditSongComponent>,
    public service: SongService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      name: [this.service.formData.name, [Validators.required]],
      artist: [this.service.formData.artist, [Validators.required]],
      year: [this.service.formData.year, [Validators.required]]
    });
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register click');
  } 

  onEdit() {
    if(this.songForm.valid) {
      this.service.formData = {
        ...this.songForm.value
      };
      this.service.updateSong(this.data, this.service.formData).subscribe(res => {
        this.snackBar.open("Edited Successfully", '', {
          duration:3000,
          verticalPosition: 'top'
        })
      })
      window.location.reload();
    }
    else {
      this.snackBar.open("Complete all required fields", '', {
        panelClass: 'red-snackbar',
        duration: 3000,
        verticalPosition: 'top'
      });
    }

  }

}
