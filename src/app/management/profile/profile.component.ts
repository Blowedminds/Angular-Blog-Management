import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms'

import { UserRequestService } from '../../request-services/user-request.service'

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: any

  subs = new Subscription()

  edit_bio: boolean = false

  AUTHOR_IMAGE_URL: string

  @ViewChild('file') file: ElementRef

  constructor(
    private userRequest: UserRequestService
  ) {
    this.AUTHOR_IMAGE_URL = userRequest.main.mainDomain + "images/author/"
   }

  ngOnInit() {
    let rq1 = this.userRequest.getUserProfile().subscribe( response => this.profile = response)

    this.subs.add(rq1)
  }

  ngOnDestroy()
  {
    this.subs.unsubscribe()
  }

  showImage(img: string)
  {
    var reader = new FileReader();

    let input = this.file.nativeElement

    let item = document.getElementById(img)

    //item.setAttribute('src', '')

    reader.onload = (e: any) => {

      let rq3 = this.userRequest.postUserProfileImage(this.file.nativeElement.files.item(0)).subscribe( response => {

        item.setAttribute('src', e.target.result)
      })

      this.subs.add(rq3)
    }

    reader.readAsDataURL(input.files.item(0));
  }

  updateProfile(f: NgForm)
  {
    let rq2 = this.userRequest.postUserProfile({name: f.value.name, bio: f.value.bio}).subscribe( response => {
                this.profile = null

                this.edit_bio = false

                let rq1 = this.userRequest.getUserProfile().subscribe( response => this.profile = response)

                this.subs.add(rq1)
              })

    this.subs.add(rq2)
  }

  updateProfileImage()
  {
    let rq3 = this.userRequest.postUserProfileImage(this.file.nativeElement.files.item(0)).subscribe( response => {

    })
  }

}
