import { Component } from '@angular/core';
import { HeaderComponent } from "../../_utils/header/header.component";
import { HeroComponent } from "../../_utils/pages/home/hero/hero.component";
import { JumboComponent } from "../../_utils/pages/home/jumbo/jumbo.component";
import { BlogComponent } from "../../_utils/pages/home/blog/blog.component";
import { SgroupComponent } from "../../_utils/pages/home/sgroup/sgroup.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroComponent,
    JumboComponent,
    BlogComponent,
    SgroupComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
