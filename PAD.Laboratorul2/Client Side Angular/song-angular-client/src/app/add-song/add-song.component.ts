import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppComponent } from '../app.component';
import { SongService } from '../services/song.service';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.css']
})
export class AddSongComponent implements OnInit {

  public songForm: FormGroup;

  constructor(public dialogbox: MatDialogRef<AddSongComponent>,
    public service: SongService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.songForm = this.formBuilder.group({
      artist: ['', [Validators.required]],
      name: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
  }

  onClose(){
    this.dialogbox.close();4
    this.service.filter('Register click');
  }

  onAdd() {
    if(this.songForm.valid) {
      this.service.formData = {
        ...this.songForm.value
      };
      this.service.addSong(this.service.formData).subscribe(res => {
        this.snackBar.open("Added Successfully", '', {
          duration: 3000,
          verticalPosition: 'top'
        });
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
