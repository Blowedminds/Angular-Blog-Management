import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms'

import { UserRequestService } from '../../request-services/user-request.service'
import { GlobalDataService } from '../../system-services/global-data.service'

import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  profile: any

  subs = new Subscription()

  bio: Array<any> = []

  languages: any

  edit_bio: boolean = false

  AUTHOR_IMAGE_URL: string

  @ViewChild('file') file: ElementRef

  constructor(
    private userRequest: UserRequestService,
    private globalDataService: GlobalDataService
  ) {
    this.AUTHOR_IMAGE_URL = userRequest.main.mainDomain + "images/author/"
   }

  ngOnInit() {
    let rq2 = this.globalDataService.languages.subscribe( response => this.languages = response )

    let rq1 = this.userRequest.getUserProfile().subscribe( response => {
      this.profile = response

      for(let one of this.languages){

        let temp = { slug: one.slug, bio: ""}

        let bio = response.bio.find( obj => one.slug === obj.slug)

        if(bio) temp.bio = bio.bio

        this.bio.push(temp)
      }

      console.log(this.bio)
    })

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
    let rq2 = this.userRequest.postUserProfile({name: f.value.name, bio: this.bio}).subscribe( response => {
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
